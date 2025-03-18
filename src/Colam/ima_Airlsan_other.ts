import { Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToMany, CreateDateColumn } from "typeorm"
import { AirIsan } from "./user.entity"
import { AirIsan_district } from "./AirIsan_district"

@Entity()
export class AirIsan_Image_ {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    img?: string

    @Column()
    description?: string

    @Column({ type: 'float', nullable: true }) 
    lat?: number;
  
    @Column({ type: 'float', nullable: true }) 
    lng?: number;

    @Column()
    airisan_number?: number

    @Column()
    name_airisan_en?: string

    @Column()
    name_airisan_th ?: string

    @OneToMany(() => AirIsan, (airisan) => airisan)
    airsan_id?: AirIsan[]

    @OneToMany(() => AirIsan_district, (district) => district.airisan_imgae)
    arirsan_district_id?: AirIsan_district[];
}