import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import inquirer from 'inquirer';
import { Sequelize } from 'sequelize-typescript';
import { VerificationToken } from '../src/users/models/verification-token.model';
import { Roles } from '../src/constants/roles';
import { formatValidationErrors } from '../src/shared/pipes/exception-factory';
import { IUser, User, UserRequestBody } from '../src/users/models/user.model';
import { dbConfig } from './db-config';
import { isEmpty } from 'lodash';

const sequelizeInstance = new Sequelize(dbConfig);

sequelizeInstance.addModels([User, VerificationToken]);

async function main() {
  const userData: Partial<IUser> = await inquirer.prompt([
    { type: 'input', name: 'name' },
    { type: 'input', name: 'lastName' },
    { type: 'input', name: 'email' },
    { type: 'password', name: 'password' },
  ]);
  userData.role = <Roles>'Admin';

  const user = plainToClass(UserRequestBody, userData);
  const validationResult = await validate(user);
  if (!isEmpty(validationResult))
    throw new Error(JSON.stringify(formatValidationErrors(validationResult)));
  await User.create({
    name: userData.name,
    lastName: userData.lastName,
    password: userData.password,
    email: userData.email,
    role: userData.role,
    active: true,
  });
}

main().then(console.log).catch(console.log);
