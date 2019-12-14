import { cli } from 'cli-ux'
import Command from '../command'

export default class Repair extends Command {
  static description = 'repair mismatched hashes and delete dirty records'

  static examples = [`$ synor repair`]

  static flags = {
    ...Command.flags
  }

  static args = []

  async run() {
    const { migrator } = this.synor

    migrator
      .on('repair:start', () => {
        cli.action.start('Repairing')
      })
      .on('repair:end', () => {
        cli.action.stop('done!')
      })

    const confirmed = await cli.confirm('Are you sure?! (y/n)')

    if (confirmed) {
      await migrator.repair()
    } else {
      this.log('Skipping repair...')
    }
  }
}
