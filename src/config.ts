import { statSync } from 'fs'
import defaultsDeep from 'lodash.defaultsdeep'
import { extname, resolve as resolvePath } from 'path'
import { dynamicImport } from './utils/dynamic-import'
import { registerTSNode } from './utils/register-ts-node'

type SynorConfig = import('@synor/core').SynorConfig

export type SynorCLIConfig = {
  /**
   * Database Engine function / [package name](https://www.npmjs.com/search?q=keywords:synor-database) / module path
   */
  databaseEngine?: SynorConfig['DatabaseEngine'] | string
  /**
   * Source Engine function / [package name](https://www.npmjs.com/search?q=keywords:synor-source) / module path
   */
  sourceEngine?: SynorConfig['SourceEngine'] | string
} & Partial<Omit<SynorConfig, 'DatabaseEngine' | 'SourceEngine'>>

async function readConfigFile(
  configFile?: string
): Promise<Partial<SynorCLIConfig & { default?: SynorCLIConfig }>> {
  const filePath = [
    configFile || '',
    `.synorrc.js`,
    `.synorrc.ts`,
    `synor.config.js`,
    `synor.config.ts`
  ]
    .map(filename => resolvePath(filename))
    .find(filePath => {
      try {
        const stat = statSync(filePath)
        return stat.isFile()
      } catch (error) {
        if (error.code === 'ENOENT') {
          return false
        }
        throw error
      }
    })

  if (!filePath) {
    return {}
  }

  if (extname(filePath) === '.ts') {
    registerTSNode()
  }

  return dynamicImport(filePath)
}

export async function getConfig(
  configFile: string | undefined,
  configOverrides: Partial<SynorCLIConfig>
): Promise<Partial<SynorCLIConfig>> {
  const config = await readConfigFile(configFile)
  return defaultsDeep({}, configOverrides, config)
}
