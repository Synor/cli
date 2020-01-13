import { cli } from 'cli-ux'
import Command from '../command'
import { getFormattedDate } from '../utils/get-formatted-date'

export default class Current extends Command {
  static description = [
    `show current migration record`,
    `This record indicates the current migration version for the database.`
  ].join('\n')

  static examples = [`$ synor current`]

  static flags = {
    'no-header': cli.table.Flags['no-header'],
    ...Command.flags
  }

  static args = []

  async run() {
    const { flags } = this.parse(Current)

    const { migrator } = this.synor

    migrator.on('current', record => {
      cli.table(
        [record],
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
            get: row => getFormattedDate(row.appliedAt)
          },
          appliedBy: {
            header: 'AppliedBy',
            get: record => record.appliedBy || 'N/A'
          },
          executionTime: {
            header: 'ExecutionTime',
            get: row => `${Number(row.executionTime / 1000).toFixed(2)}s`
          },
          state: {
            header: 'State',
            get: row => (row.dirty ? 'dirty' : row.state)
          }
        },
        {
          'no-header': flags['no-header']
        }
      )
    })

    await migrator.current()
  }
}
