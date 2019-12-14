import { SynorError } from '@synor/core'

export type ValidationErrorType = Extract<
  SynorError['type'],
  'dirty' | 'hash_mismatch'
>

const DirtyErrorType: ValidationErrorType = 'dirty'
const HashMismatchErrorType: ValidationErrorType = 'hash_mismatch'

export const isSynorError = (error: Error): error is SynorError => {
  return error instanceof SynorError
}

export const isValidationErrorType = (
  errorType: SynorError['type']
): errorType is ValidationErrorType => {
  return errorType === DirtyErrorType || errorType === HashMismatchErrorType
}
