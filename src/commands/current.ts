import Command from '../command'

export default class Current extends Command {
  static description = 'Get current database migration version'

  static examples = [[`$ synor current`, `Current Version: 0`].join('\n')]

  static flags = {
    ...Command.flags
  }

  static args = []

  async run() {
    this.synor.migrator.on('version', version => {
      this.log(`Current Version: ${version}`)
    })

    await this.synor.migrator.open()
    await this.synor.migrator.version()
    await this.synor.migrator.close()
  }
}
