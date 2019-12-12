import Command from '../command'
import { cli } from 'cli-ux'

export default class Drop extends Command {
  static description = 'drop database'

  static examples = [`$ synor drop`]

  static flags = {
    ...Command.flags
  }

  static args = []

  async run() {
    const { migrator } = this.synor

    migrator
      .on('drop:start', () => {
        cli.action.start('Dropping')
      })
      .on('drop:end', () => {
        cli.action.stop('done!')
      })

    await migrator.open()

    const confirmed = await cli.confirm('[DANGEROUS] Are you sure?! (y/n)')

    if (confirmed) {
      await migrator.drop()
    }

    await migrator.close()
  }
}
