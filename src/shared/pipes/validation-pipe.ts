import { ValidationPipe } from '@nestjs/common';
import { appExceptionFactory } from './exception-factory';

export const ValidationWhitelistPipe = (groups: string[] = undefined) =>
  new ValidationPipe({
    whitelist: true,
    groups: groups,
    exceptionFactory: appExceptionFactory,
  });

export class CustomValidationtPipe extends ValidationPipe {}

export const SimpleValidationtPipe = () =>
  new CustomValidationtPipe({
    exceptionFactory: appExceptionFactory,
  });
