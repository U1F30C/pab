import { Type } from 'class-transformer';
import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Types: typeof DataTypes) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      transaction;
      await queryInterface.createTable(
        'Mascotas',
        {
          id_mascota: {
            type: Types.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          nombre: { type: Types.STRING, allowNull: false },
          descripcion: { type: Types.STRING, allowNull: false },
          imagen: { type: Types.STRING, allowNull: false },
          especie: { type: Types.STRING, allowNull: false },
          raza: { type: Types.STRING },
          estado: { type: Types.STRING, allowNull: false },
          sexo: { type: Types.STRING, allowNull: false },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Clientes',
        {
          id_cliente: {
            type: Types.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          nombre: { type: Types.STRING, allowNull: false },
          descripcion: { type: Types.STRING, allowNull: false },
          direccion: { type: Types.STRING, allowNull: false },
          correo: { type: Types.STRING },
          telefono: { type: Types.STRING, allowNull: false },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Empleados',
        {
          id_empleado: {
            type: Types.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          nombre: { type: Types.STRING, allowNull: false },
          puesto: { type: Types.STRING, allowNull: false },
          correo: { type: Types.STRING },
          direccion: { type: Types.STRING, allowNull: false },
          telefono: { type: Types.STRING, allowNull: false },
          estado: { type: Types.STRING, allowNull: false },
          usuario: { type: Types.STRING, allowNull: false },
          contrasena: { type: Types.STRING, allowNull: false },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Vacunas',
        {
          id_vacuna: {
            type: Types.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          nombre_vacuna: { type: Types.STRING, allowNull: false },
          vigencia: { type: Types.STRING, allowNull: false },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Gastos',
        {
          id_gasto: {
            type: Types.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          fecha: { type: Types.DATE, allowNull: false },
          cantidad: { type: Types.DECIMAL, allowNull: false },
          descripcion: { type: Types.STRING, allowNull: false },
          id_empleado: {
            type: Types.BIGINT,
            allowNull: false,
            references: {
              model: 'Empleados',
              key: 'id_empleado',
            },
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Donativos',
        {
          id_donativo: {
            type: Types.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          fecha: { type: Types.DATE, allowNull: false },
          cantidad: { type: Types.DECIMAL, allowNull: true },
          descripcion: { type: Types.STRING, allowNull: false },
          nombre_donador: { type: Types.STRING, allowNull: false },
          comentario: { type: Types.STRING, allowNull: false },
          id_cliente: {
            type: Types.BIGINT,
            allowNull: true,
            references: {
              model: 'Clientes',
              key: 'id_cliente',
            },
          },
          id_empleado: {
            type: Types.BIGINT,
            allowNull: false,
            references: {
              model: 'Empleados',
              key: 'id_empleado',
            },
          },
        },
        { transaction },
      );
      await queryInterface.createTable('Donativos', {}, { transaction });
      await queryInterface.createTable(
        'Vacunas_Disponibles_Mascotas',
        {
          id_vac_dis_masc: {
            type: Types.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          id_vacuna: {
            type: Types.BIGINT,
            allowNull: false,
            references: {
              model: 'Vacunas',
              key: 'id_vacuna',
            },
          },
          fecha_aplicacion: { type: Types.DATE, allowNull: false },
          id_mascota: {
            type: Types.BIGINT,
            allowNull: false,
            references: {
              model: 'Mascotas',
              key: 'id_mascota',
            },
          },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Entradas',
        {
          id_entrada: {
            type: Types.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          id_empleado: {
            type: Types.BIGINT,
            allowNull: false,
            references: {
              model: 'Empleados',
              key: 'id_empleado',
            },
          },

          fecha: { type: Types.DATE, allowNull: false },
          nombre_donador: { type: Types.STRING, allowNull: false },
        },
        { transaction },
      );
      await queryInterface.createTable(
        'Adopciones',
        {
          id_adopcion: {
            type: Types.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          id_empleado: {
            type: Types.BIGINT,
            allowNull: false,
            references: {
              model: 'Empleados',
              key: 'id_empleado',
            },
          },
          id_cliente: {
            type: Types.BIGINT,
            allowNull: false,
            references: {
              model: 'Clientes',
              key: 'id_cliente',
            },
          },

          fecha_solicitud: { type: Types.DATE, allowNull: false },
          // fecha de resolución
          fecha: { type: Types.DATE, allowNull: false },
          estado: { type: Types.STRING, allowNull: false },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'Entradas_Mascotas',
        {
          id_entrada_masc: {
            type: Types.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          id_mascota: {
            type: Types.BIGINT,
            allowNull: false,
            references: {
              model: 'Mascotas',
              key: 'id_mascota',
            },
          },
          id_entrada: {
            type: Types.BIGINT,
            allowNull: false,
            references: {
              model: 'Entradas',
              key: 'id_entrada',
            },
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'Adopciones_Mascotas',
        {
          id_adop_masc: {
            type: Types.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          id_mascota: {
            type: Types.BIGINT,
            allowNull: false,
            references: {
              model: 'Mascotas',
              key: 'id_mascota',
            },
          },
          id_adopcion: {
            type: Types.BIGINT,
            allowNull: false,
            references: {
              model: 'Adopciones',
              key: 'id_adopcion',
            },
          },
        },
        { transaction },
      );
    });
  },
  down: async (queryInterface: QueryInterface, Types: typeof DataTypes) => {},
};
