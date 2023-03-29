import { Sequelize, Options} from "sequelize";

const DB_NAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_PASS = process.env.DB_PASS as string;
const DB_CONFIG:Options = {
  dialect: "mysql",
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
};

let db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);


async function hasConection() {
  try {
    await db.authenticate();
    console.log("Banco dados conectado!");
  } catch (error) {
    console.error("Erro ao tentar se conectar ao banco de dados.");
  }
}

Object.assign(db, {
  hasConection,
});

export default db;
