import "reflect-metadata"
import { DataSource } from "typeorm"
import { AirIsan } from "../Colam/user.entity"
import { AirIsan_district } from "../Colam/AirIsan_district"
import { AirIsan_Image_ } from "../Colam/ima_Airlsan_other"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Dream480201",
    database: "new_schema01",
    entities: [AirIsan, AirIsan_district, AirIsan_Image_],
    synchronize: true,
    logging: false,
})
