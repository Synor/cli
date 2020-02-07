import { cli } from 'cli-ux'
import Command from '../command'
import { getFormattedDate } from '../utils/get-formatted-date'
import { flags } from '@oclif/command'

export default class Info extends Command {
  static description = [
    `show migration information`,
    `Shows detailed information about schema migrations.`
  ].join('\n')

  static examples = [
    `$ synor info`,
    `$ synor info --outOfOrder`,
    `$ synor info --no-header --columns version --filter state=pending`
  ]

  static flags = {
    ...Command.flags,
    columns: cli.table.Flags.columns,
    extended: cli.table.Flags.extended,
    filter: cli.table.Flags.filter,
    'no-header': cli.table.Flags['no-header'],
    outOfOrder: flags.boolean({
      char: 'z',
      description: 'include out of order pending migrations',
      default: false,
      env: 'SYNOR_OUT_OF_ORDER'
    })
  }

  static args = []

  async run() {
    const { flags } = this.parse(Info)

    const { migrator } = this.synor

    migrator.on('info', items => {
      cli.table(
        items,
        {
          id: {
            header: 'ID',
            get: item => ('id' in item ? item.id : '')
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
            get: row => row.hash || 'N/A'
          },
          appliedAt: {
            header: 'AppliedAt',
            get: item =>
              'appliedAt' in item ? getFormattedDate(item.appliedAt) : ''
          },
          appliedBy: {
            header: 'AppliedBy',
            get: item => ('appliedBy' in item ? item.appliedBy || 'N/A' : ''),
            extended: true
          },
          executionTime: {
            header: 'ExecutionTime',
            get: item =>
              'executionTime' in item
                ? item.executionTime
                  ? `${Number(item.executionTime / 1000).toFixed(2)}s`
                  : 'N/A'
                : '',
            extended: true
          },
          state: {
            header: 'State',
            get: item =>
              'dirty' in item ? (item.dirty ? 'dirty' : item.state) : item.state
          },
          revertedBy: {
            header: 'RevertedBy',
            get: item => ('revertedBy' in item ? item.revertedBy || '' : ''),
            extended: true
          }
        },
        {
          columns: flags.columns,
          extended: flags.extended,
          filter: flags.filter,
          'no-header': flags['no-header']
        }
      )
    })

    await migrator.info({ outOfOrder: flags.outOfOrder })
  }
}
