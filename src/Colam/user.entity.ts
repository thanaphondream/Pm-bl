import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from "typeorm"
import { AirIsan_district } from "./AirIsan_district"

@Entity()
export class AirIsan {
    @PrimaryGeneratedColumn()
    id?: number 

    @Column()
    year?: string

    @Column()
    month?: string

    @Column()
    day?: string

    @Column()
    Hour?: string

    @Column()
    province?: string

    @Column()
    district?: string

    @Column()
    ododp?: number

    @Column()
    vegetation?: number

    @Column()
    layer_heigh?: number

    @Column()
    temperature?: number

    @Column()
    relative_hamidity?: number

    @Column()
    wind_speed?: number

    @Column()
    PM25?: number

    @Column()
    dust_height?: number

    @Column()
    number_column?: number

    @ManyToMany(() => AirIsan_district, (airIsanDistrict) => airIsanDistrict.airisan)
    @JoinTable()
    airisan_district_id?: AirIsan_district[];

}