import { exit } from "node:process"
import db from "../config/db"

const clearDB = async () => {
    try {
        await db.sync({force: true})
        console.log("Datos eliminados correctamente")
        exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv.includes("--clear")) {
    clearDB()
}

console.log(process.argv[2])