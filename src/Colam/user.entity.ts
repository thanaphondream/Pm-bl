import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, CreateDateColumn, ManyToOne } from "typeorm"
import { AirIsan_district } from "./AirIsan_district"
import { AirIsan_Image_ } from "./ima_Airlsan_other"

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


    @CreateDateColumn() 
    createdAt?: Date;

    @ManyToMany(() => AirIsan_district, (airIsanDistrict) => airIsanDistrict.airisan)
    @JoinTable()
    airisan_district_id?: AirIsan_district[];

    @ManyToOne(() => AirIsan_Image_, (airisan_image) => airisan_image.airsan_id)
    airsan_image_id?: AirIsan_Image_

}