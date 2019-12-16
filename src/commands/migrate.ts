import { cli } from 'cli-ux'
import Command from '../command'

export default class Migrate extends Command {
  static description = 'migrate to targetVersion'

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
      })
      .on('migrate:start', () => {
        this.debug('Starting migration...')
      })
      .on('migrate:end', () => {
        this.debug('Finished migration!')
      })
      .on('migrate:run:start', source => {
        cli.action.start(
          `Running ${source.version} [${source.type}] ${source.title}`
        )
      })
      .on('migrate:run:end', () => {
        cli.action.stop('done!')
      })

    await migrator.current()

    const confirmed = await cli.confirm(
      [
        `Current Version: ${currentVersion!}`,
        `Target Version: ${args.targetVersion}`,
        `Continue? (y/n)`
      ].join('\n')
    )

    if (confirmed) {
      await migrator.validate()
      await migrator.migrate(args.targetVersion)
    } else {
      this.log('Skipping migrate...')
    }
  }
}
