import { Synor } from '@synor/core'
import { getConfig } from './config'
import { dynamicImport } from './utils/dynamic-import'

type DatabaseEngineFactory = import('@synor/core').DatabaseEngineFactory
type SourceEngineFactory = import('@synor/core').SourceEngineFactory
type SynorConfig = import('@synor/core').SynorConfig
type SynorCLIConfig = import('./config').SynorCLIConfig

type Options = { config?: string } & Partial<SynorCLIConfig>

async function getEngineFactory<
  T extends DatabaseEngineFactory | SourceEngineFactory
>(engine?: string | T): Promise<T | undefined> {
  if (typeof engine === 'string') {
    return dynamicImport<T>(engine)
  }

  if (typeof engine === 'function') {
    return engine
  }
}

export async function initSynor({
  config: configFile,
  ...configFlags
}: Options): Promise<ReturnType<typeof Synor>> {
  const { databaseEngine, sourceEngine, ...config } = await getConfig(
    configFile,
    configFlags
  )

  const synorConfig: Partial<SynorConfig> = { ...config }

  synorConfig.DatabaseEngine = await getEngineFactory(databaseEngine)
  synorConfig.SourceEngine = await getEngineFactory(sourceEngine)

  const synor = Synor(synorConfig)

  return synor
}
