import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import Product from "../models/Product.model"
dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + "/../models/**/*"],
    dialect: "postgres",
    logging: false,
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

db.addModels([Product])

export default db