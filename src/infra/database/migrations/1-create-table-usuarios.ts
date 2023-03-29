import { QueryInterface, DataTypes } from 'sequelize';

export default {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('usuarios', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nome: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            senha: {
                type: DataTypes.STRING(300),
            },
            fone: {
                type: DataTypes.STRING,
            },
            tipo:{
                type: DataTypes.STRING,
                defaultValue: "2"
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            }
        })
    },
    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable('usuarios');
    }
}