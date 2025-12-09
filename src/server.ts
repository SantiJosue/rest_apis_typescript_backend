import express from "express"
import router from "./router"
import db from "./config/db"
import colors from "colors"
import swaggerUi from "swagger-ui-express"
import swaggerSpec, { swaggerUiOptions } from "./config/swagger"
import cors, { CorsOptions } from "cors"
import morgan from "morgan"

// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        await db.sync()
        console.log(colors.blue.bold("Conexión exitosa a la base de datos"))
    } catch (error) {
        console.log(colors.red.bold("Hubo un error al conectar a la base de datos"))
        console.log(error)
    }

}

connectDB()

// Instancia de express
const server = express()

// Permitir conexiones
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "https://rest-apis-typescript-frontend-7c4xis6k6.vercel.app"
];

const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Error de CORS"));
        }
    }
};

server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

server.use(morgan("dev"))
server.use("/api/products", router)

// Docs 
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server