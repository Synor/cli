import { cli } from 'cli-ux'
import Command from '../command'
import { isSynorError, isValidationErrorType } from '../utils/error'

export default class Migrate extends Command {
  static description = 'run migrations'

  static examples = [`$ synor migrate`]

  static flags = {
    ...Command.flags
  }

  static args: typeof Command.args = [
    {
      name: 'targetVersion',
      description: 'target version for migration',
      required: true
    }
  ]

  async run() {
    const { args } = this.parse(Migrate)

    const { migrator } = this.synor

    let currentVersion: string

    migrator
      .on('current', record => {
        currentVersion = record.version
        this.log(`Current Version: ${currentVersion!}`)
        this.log(`Target Version: ${args.targetVersion}`)
      })
      .on('migrate:start', () => {
        this.log(`Starting migration...`)
      })
      .on('migrate:end', () => {
        this.log('Migration done!')
      })
      .on('migrate:run:start', source => {
        cli.action.start(
          `Running ${source.version} [${source.type}] ${source.title}`
        )
      })
      .on('migrate:run:end', () => {
        cli.action.stop('done!')
      })
      .on('validate:error', (_record, error) => {
        if (isSynorError(error) && isValidationErrorType(error.type)) {
          this.error(
            [
              `Validation Error (${error.type}) =>`,
              `Version(${error.data.version})`,
              `Type(${error.data.type})`,
              error.data.title && `Title(${error.data.title})`,
              `\nRun validation for more information:`,
              `\n$ ${this.config.bin} validate`
            ].join(' '),
            { code: error.type, exit: 1 }
          )
        }
      })

    await migrator.current()

    const confirmed = await cli.confirm('Continue? (y/n)')

    if (confirmed) {
      await migrator.validate()
      await migrator.migrate(args.targetVersion)
    } else {
      this.log('Skipping migrate...')
    }
  }
}
