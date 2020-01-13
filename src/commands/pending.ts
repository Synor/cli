import { cli } from 'cli-ux'
import Command from '../command'

export default class Pending extends Command {
  static description = [
    `show pending migrations`,
    `Shows the pending migrations that are available at source.`
  ].join('\n')

  static examples = [`$ synor pending`]

  static flags = {
    extended: cli.table.Flags.extended,
    'no-header': cli.table.Flags['no-header'],
    ...Command.flags
  }

  static args = []

  async run() {
    const { flags } = this.parse(Pending)

    const { migrator } = this.synor

    migrator.on('pending', sources => {
      cli.table(
        sources,
        {
          version: {
            header: 'Version'
          },
          type: {
            header: 'Type'
          },
          title: {
            header: 'Title'
          },
          hash: {
            header: 'Hash'
          },
          body: {
            header: 'Body',
            extended: true
          }
        },
        {
          extended: flags.extended,
          'no-header': flags['no-header']
        }
      )
    })

    await migrator.pending()
  }
}
