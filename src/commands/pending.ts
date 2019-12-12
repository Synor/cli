import { cli } from 'cli-ux'
import Command from '../command'

export default class Pending extends Command {
  static description = 'show pending migrations'

  static examples = [[`$ synor pending`].join('\n')]

  static flags = {
    extended: cli.table.Flags.extended,
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
          extended: flags.extended
        }
      )
    })
    await migrator.open()
    await migrator.pending()
    await migrator.close()
  }
}
