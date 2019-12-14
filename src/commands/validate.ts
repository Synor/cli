import { color } from '@oclif/color'
import { cli } from 'cli-ux'
import Command from '../command'
import { isSynorError, isValidationErrorType } from '../utils/error'

type MigrationRecord = import('@synor/core').MigrationRecord
type ValidationErrorType = import('../utils/error').ValidationErrorType

export default class Validate extends Command {
  static description = 'validate applied migrations'

  static examples = [`$ synor validate`]

  static flags = {
    ...Command.flags
  }

  static args = []

  async run() {
    const { migrator } = this.synor

    const recordById: Record<
      number,
      MigrationRecord & {
        status: '...' | 'valid' | ValidationErrorType
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
      .on('validate:error', (record, error) => {
        if (isSynorError(error) && isValidationErrorType(error.type)) {
          recordById[record.id].status = error.type
        } else {
          throw error
        }
      })
      .on('validate:end', async () => {
        const records = Object.values(recordById)

        cli.table(records, {
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
            header: 'Type',
            extended: true
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
            get: row => new Date(row.appliedAt).toLocaleString(),
            extended: true
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
          status: {
            header: 'Status',
            get: row =>
              row.status === 'valid'
                ? color.green(row.status)
                : color.red(row.status)
          }
        })

        isInvalid = records.some(record => record.status !== 'valid')
      })

    await migrator.validate()

    if (isInvalid) {
      this.error('Validation Error', { exit: 1 })
    }
  }
}
