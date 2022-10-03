import { dbConfig } from './db-config';
import { Command } from 'commander';
import { writeFile } from 'fs';
import { kebabCase } from 'lodash';
import { join } from 'path';
import { DataTypes, Sequelize } from 'sequelize';
import Umzug from 'umzug';

function getMigrationTimestamp() {
  const a = new Date();

  function format(value: number) {
    return value.toString().padStart(2, '0');
  }

  const year = a.getFullYear();
  const month = format(a.getMonth() + 1);
  const day = format(a.getDate());
  const hour = format(a.getHours());
  const minute = format(a.getMinutes());
  const second = format(a.getSeconds());

  return `${year}${month}${day}${hour}${minute}${second}`;
}

function fileName(name: string) {
  const timestamp = getMigrationTimestamp();
  const formatedName = kebabCase(name);
  return `${timestamp}-${formatedName}.ts`;
}
function migrationBody() {
  return `import { DataTypes, QueryInterface } from "sequelize";

  module.exports = {
    up: async (queryInterface: QueryInterface, Types: typeof DataTypes) => {},
    down: async (queryInterface: QueryInterface, Types: typeof DataTypes) => {},
  };
  `;
}

class Migrator {
  umzug: Umzug.Umzug;
  constructor() {
    const sequelize: Sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        // dialectModule: pg,
        ...dbConfig,
      },
    );
    this.umzug = new Umzug({
      migrations: {
        params: [sequelize.getQueryInterface(), DataTypes],
        path: 'migrations',
        pattern: /.*\.ts$/,
      },
      storageOptions: {
        sequelize: sequelize,
      },
      storage: 'sequelize',
    });
  }
  up() {
    return this.umzug.up();
  }
  down() {
    return this.umzug.down();
  }
  new(migration: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const path = join('migrations', fileName(migration));
      writeFile(path, migrationBody(), function (error) {
        if (error) reject(error);
        else resolve(fileName(migration));
      });
    });
  }
}
const migrator = new Migrator();

const program = new Command();
program.version('0.0.1');
program
  .command('[migration]', { isDefault: true })
  .action(async (migration: string) => {
    await migrator.up().then(console.log).catch(console.error);
  });
program.command('undo [migration]').action(async (migration: string) => {
  await migrator.down().then(console.log).catch(console.error);
});
program.command('new [migration]').action(async (migration: string) => {
  await migrator.new(migration).then(console.log).catch(console.error);
});
program.parse();
