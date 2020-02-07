import { flags } from '@oclif/command'
import { cli } from 'cli-ux'
import Command from '../command'

export default class Migrate extends Command {
  static description = [
    `migrate database to specific version`,
    `Runs necessary migrations to reach the target migration version.`
  ].join('\n')

  static examples = [
    `$ synor migrate 42`,
    `$ synor migrate --from=00 --to=42`,
    `$ synor migrate 42 --outOfOrder`
  ]

  static flags = {
    ...Command.flags,
    from: flags.string({
      char: 'f',
      description: 'from migration version',
      dependsOn: ['to']
    }),
    to: flags.string({
      char: 't',
      description: 'to migration version',
      dependsOn: ['from']
    }),
    outOfOrder: flags.boolean({
      char: 'z',
      description: 'include out of order pending migrations',
      default: false,
      env: 'SYNOR_OUT_OF_ORDER'
    })
  }

  static args: typeof Command.args = [
    {
      name: 'targetVersion',
      description: 'target migration version'
    }
  ]

  async run() {
    const { args, flags } = this.parse(Migrate)

    const { migrator } = this.synor

    const targetVersion: string = flags.to || args.targetVersion

    if (!targetVersion) {
      this.error('Must provide either --to= or TARGETVERSION')
    }

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

    let confirmed = Boolean(flags.from)

    if (confirmed && flags.from !== currentVersion!) {
      this.error(
        `Provided --from=${
          flags.from
        } but Current Version is ${currentVersion!}`
      )
    }

    if (!confirmed) {
      confirmed = await cli.confirm(
        [
          `Current Version: ${currentVersion!}`,
          `Target Version: ${targetVersion}`,
          `Continue? (y/n)`
        ].join('\n')
      )
    }

    if (confirmed) {
      await migrator.validate()
      await migrator.migrate(targetVersion, { outOfOrder: flags.outOfOrder })
    } else {
      this.debug('Skipping migrate...')
    }
  }
}
