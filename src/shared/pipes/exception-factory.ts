import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { chain, flatMap, isArray, isEmpty } from 'lodash';
import { APIError } from '../enums/api-errors';

const constraintErrorMap = {
  isNumber: APIError.ExpectedNumber,
  isString: APIError.ExpectedString,
  isEnum: APIError.InvalidValue,
  isDateString: APIError.InvalidDate,
  isAboveMinValue: APIError.ValueBelowAllowed,
  isBelowMinValue: APIError.ValueAboveAllowed,
  arrayUnique: APIError.DuplicatedValue,
};

function getErrorString(constraint: string) {
  return constraintErrorMap[constraint] ?? APIError.InvalidValue;
}

function getFirstConstraintAndMessage(constraints: { [type: string]: string }) {
  return chain(constraints).entries().head().value();
}

function formatError(error: ValidationError, currentPath: string[]): any {
  let value = error.value;
  if (isArray(value)) value = undefined;
  const [constraint, message] = getFirstConstraintAndMessage(error.constraints);
  if (constraint == 'containsRequiredVariables') {
    value = message;
  }

  return {
    value,
    property: currentPath.join('.'),
    error: getErrorString(constraint),
  };
}

export function flatMapErrors(errors: ValidationError[], path = []) {
  return flatMap(errors, (error) => {
    const hasChildren = !isEmpty(error.children);
    const currentPath = path.concat(error.property);
    if (hasChildren) {
      return flatMapErrors(error.children, currentPath);
    } else {
      return formatError(error, currentPath);
    }
  });
}

export function formatValidationErrors(errors: ValidationError[]) {
  return { errors: flatMapErrors(errors) };
}

export function formatErrorReason(error: string) {
  return { errors: [{ error }] };
}

export function appExceptionFactory(errors: ValidationError[]) {
  return new BadRequestException(formatValidationErrors(errors));
}
