import { Command, flags } from '@oclif/command'
import { Input } from '@oclif/parser'
import { isSynorError } from '@synor/core'
import { cli } from 'cli-ux'
import { initSynor } from './synor'

type Await<T> = T extends Promise<infer U> ? U : T

export default abstract class extends Command {
  private initialized = false

  synor!: Await<ReturnType<typeof initSynor>>

  static flags = {
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

    if (this.config.debug) {
      this.synor.migrator
        .on('open:start', () => {
          cli.action.start('Opening migrator')
        })
        .on('open:end', () => {
          cli.action.stop()
        })
        .on('close:start', () => {
          cli.action.start('Closing migrator')
        })
        .on('close:end', () => {
          cli.action.stop()
        })
    }

    await this.synor.migrator.open()

    this.initialized = true
  }

  async catch(error: Error) {
    if (isSynorError(error, 'dirty') || isSynorError(error, 'hash_mismatch')) {
      this.error(
        [
          error.message,
          `Run validation for more information:`,
          `$ ${this.config.bin} validate`
        ].join('\n'),
        { code: error.type, exit: 1 }
      )
    }

    if (isSynorError(error, 'not_found')) {
      this.error(error.message, { code: error.type, exit: 1 })
    }

    if (isSynorError(error)) {
      this.error(error, { code: error.type, exit: 1 })
    }

    await super.catch(error)
  }

  async finally(error: Error) {
    if (this.initialized) {
      await this.synor.migrator.close()
    }

    await super.finally(error)
  }
}
