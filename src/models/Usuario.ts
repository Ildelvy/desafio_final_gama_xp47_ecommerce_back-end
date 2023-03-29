import db from '../infra/database';
import {DataTypes, ModelDefined, Optional} from 'sequelize';

export interface IUsuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    fone: string;
    tipo: string;
    createdAt: Date;
    updatedAt: Date;
}

type UsuarioCreation = Optional<IUsuario, 'id' | 'createdAt' | 'updatedAt'>;

const UsuarioModel: ModelDefined<IUsuario, UsuarioCreation> = db.define(
    "Usuarios",
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome:{
            type: DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
        },
        senha:{
            type: DataTypes.STRING(300),
        },
        fone:{
            type: DataTypes.STRING,
        },
        tipo:{
            type: DataTypes.STRING,
            defaultValue: "2"
        },
        createdAt:{
            type: DataTypes.DATE,
        },
        updatedAt:{
            type: DataTypes.DATE,
        }
    },
    {
        tableName: "usuarios",
    }
);

export default UsuarioModel;