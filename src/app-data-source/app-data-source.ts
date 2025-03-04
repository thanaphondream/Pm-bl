import "reflect-metadata"
import { DataSource } from "typeorm"
import { AirIsan } from "../Colam/user.entity"
import { AirIsan_district } from "../Colam/AirIsan_district"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Dream480201",
    database: "p_m",
    entities: [AirIsan, AirIsan_district],
    synchronize: true,
    logging: false,
})
