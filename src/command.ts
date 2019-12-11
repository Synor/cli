import { Command, flags } from '@oclif/command'
import { Input } from '@oclif/parser'
import { initSynor } from './synor'

type Await<T> = T extends Promise<infer U> ? U : T

export default abstract class extends Command {
  synor!: Await<ReturnType<typeof initSynor>>

  static flags = {
    help: flags.help({ char: 'h', description: 'show help' }),
    config: flags.string({
      char: 'c',
      description: 'Configuration file path',
      env: 'SYNOR_CONFIG'
    }),
    databaseEngine: flags.string({
      char: 'D',
      description: 'Database Engine',
      env: 'SYNOR_DATABASE_ENGINE'
    }),
    databaseUri: flags.string({
      char: 'd',
      description: 'Database URI',
      env: 'SYNOR_DATABASE_URI'
    }),
    sourceEngine: flags.string({
      char: 'S',
      description: 'Source Engine',
      env: 'SYNOR_SOURCE_ENGINE'
    }),
    sourceUri: flags.string({
      char: 's',
      description: 'Source URI',
      env: 'SYNOR_SOURCE_URI'
    }),
    baseVersion: flags.string({
      char: 'b',
      description: 'Version of the Base Migration',
      env: 'SYNOR_BASE_VERSIOON'
    }),
    recordStartId: flags.integer({
      char: 'i',
      description: 'Migration Record Start ID',
      env: 'SYNOR_RECORD_START_ID'
    })
  }

  async init() {
    const { flags } = this.parse(this.constructor as Input<any>)

    this.synor = await initSynor({
      config: flags.config,
      databaseEngine: flags.databaseEngine,
      databaseUri: flags.databaseUri,
      sourceEngine: flags.sourceEngine,
      sourceUri: flags.sourceUri,
      baseVersion: flags.baseVersion,
      recordStartId: flags.recordStartId
    })
  }
}
