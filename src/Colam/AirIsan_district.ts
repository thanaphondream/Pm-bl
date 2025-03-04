import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from "typeorm"
import { AirIsan } from "./user.entity"

@Entity()
export class AirIsan_district {
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

    @ManyToMany(() => AirIsan, (airIsan) => airIsan.airisan_district_id)
    airisan?: AirIsan[];

}