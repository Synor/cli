import { Command, flags } from '@oclif/command'
import { Input } from '@oclif/parser'
import { cli } from 'cli-ux'
import { initSynor } from './synor'
import { isSynorError } from './utils/error'

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
      env: 'SYNOR_BASE_VERSION'
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

    this.synor.migrator
      .on('open:start', () => {
        cli.action.start('Opening migrator')
      })
      .on('open:end', () => {
        cli.action.stop('done!')
      })
      .on('close:start', () => {
        cli.action.start('Closing migrator')
      })
      .on('close:end', () => {
        cli.action.stop('done!')
      })

    await this.synor.migrator.open()
  }

  async catch(error: Error) {
    if (isSynorError(error)) {
      switch (error.type) {
        case 'not_found':
          this.error(
            [
              `Missing Migration Source =>`,
              `Version(${error.data.version})`,
              `Type(${error.data.type})`,
              error.data.title && `Title(${error.data.title})`
            ].join(' '),
            { code: error.type, exit: 1 }
          )
          break
        case 'exception':
          this.error(error.message, { code: error.type, exit: 1 })
          break
      }
    }

    await super.catch(error)
  }

  async finally(error: Error) {
    await this.synor.migrator.close()

    await super.finally(error)
  }
}
