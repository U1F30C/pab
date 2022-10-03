export enum APIError {
  MissingValue = 'MissingValue',
  DuplicatedValue = 'DuplicatedValue',
  InvalidFormat = 'InvalidFormat',
  InvalidDate = 'InvalidDate',
  NotFound = 'NotFound',
  ValueAboveAllowed = 'ValueAboveAllowed',
  ValueBelowAllowed = 'ValueBelowAllowed',
  ExpectedString = 'ExpectedString',
  ExpectedNumber = 'ExpectedNumber',
  InvalidValue = 'InvalidValue',
}

export enum ErrorReasons {
  Unknown = 'Unknown',
  InactiveUser = 'InactiveUser',
  WrongPassword = 'WrongPassword',
  DuplicatedEmail = 'DuplicatedEmail',
  InvalidToken = 'InvalidToken',
  Unauthorized = 'Unauthorized',
}
