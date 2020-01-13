import { color } from '@oclif/color'
import { isSynorError } from '@synor/core'
import { cli } from 'cli-ux'
import Command from '../command'

type MigrationRecord = import('@synor/core').MigrationRecord

export default class Validate extends Command {
  static description = [
    `validate migration records`,
    `Validates the records for migrations that are currently applied.`
  ].join('\n')

  static examples = [`$ synor validate`]

  static flags = {
    extended: cli.table.Flags.extended,
    ...Command.flags
  }

  static args = []

  async run() {
    const { flags } = this.parse(Validate)

    const { migrator } = this.synor

    const recordById: Record<
      number,
      MigrationRecord & {
        status: '...' | 'valid' | 'dirty' | 'hash_mismatch'
      }
    > = {}

    let isInvalid = true

    migrator
      .on('validate:run:start', async record => {
        recordById[record.id] = { ...record, status: '...' }
      })
      .on('validate:run:end', async record => {
        recordById[record.id].status = 'valid'
      })
      .on('validate:error', (error, record) => {
        if (
          isSynorError(error, 'dirty') ||
          isSynorError(error, 'hash_mismatch')
        ) {
          recordById[record.id].status = error.type
        } else {
          throw error
        }
      })
      .on('validate:end', async () => {
        const records = Object.values(recordById)

        cli.table(
          records,
          {
            id: {
              header: 'ID',
              extended: true
            },
            version: {
              header: 'Version',
              get: row =>
                row.status === 'valid'
                  ? color.green(row.version)
                  : color.red(row.version)
            },
            type: {
              header: 'Type'
            },
            title: {
              header: 'Title'
            },
            hash: {
              header: 'Hash',
              get: row =>
                row.status === 'hash_mismatch'
                  ? color.red(row.hash)
                  : color.green(row.hash)
            },
            appliedAt: {
              header: 'AppliedAt',
              get: row => color.reset(new Date(row.appliedAt).toLocaleString()),
              extended: true
            },
            appliedBy: {
              header: 'AppliedBy',
              get: record => color.reset(record.appliedBy || 'N/A'),
              extended: true
            },
            executionTime: {
              header: 'ExecutionTime',
              get: row =>
                color.reset(`${Number(row.executionTime / 1000).toFixed(2)}s`),
              extended: true
            },
            status: {
              header: 'Status',
              get: row =>
                row.status === 'valid'
                  ? color.green(row.status)
                  : color.red(row.status)
            }
          },
          {
            extended: flags.extended
          }
        )

        isInvalid = records.some(record => record.status !== 'valid')
      })

    await migrator.validate()

    if (isInvalid) {
      this.error('Validation Error', { exit: 1 })
    }
  }
}
