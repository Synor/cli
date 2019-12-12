import { cli } from 'cli-ux'
import Command from '../command'

export default class History extends Command {
  static aliases = ['records']

  static description = 'show migration history'

  static examples = [`$ synor history`, `$ synor history --recordStartId=1`]

  static flags = {
    extended: cli.table.Flags.extended,
    ...Command.flags
  }

  static args = []

  async run() {
    const { flags } = this.parse(History)

    const { migrator } = this.synor

    migrator.on('history', records => {
      cli.table(
        records,
        {
          id: {
            header: 'ID'
          },
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
            header: 'Hash',
            get: record => record.hash || 'N/A'
          },
          appliedAt: {
            header: 'AppliedAt',
            get: row => new Date(row.appliedAt).toLocaleString()
          },
          appliedBy: {
            header: 'AppliedBy',
            get: record => record.appliedBy || 'N/A',
            extended: true
          },
          executionTime: {
            header: 'ExecutionTime',
            get: row => `${Number(row.executionTime / 1000).toFixed(2)}s`,
            extended: true
          },
          state: {
            header: 'State',
            get: row => (row.dirty ? 'dirty' : row.state)
          },
          revertedBy: {
            header: 'RevertedBy',
            get: row => row.revertedBy || '',
            extended: true
          }
        },
        {
          extended: flags.extended
        }
      )
    })

    await migrator.open()
    await migrator.history()
    await migrator.close()
  }
}
