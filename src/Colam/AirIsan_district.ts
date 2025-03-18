import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToMany, CreateDateColumn, ManyToOne } from "typeorm"
import { AirIsan } from "./user.entity"
import { AirIsan_Image_ } from "./ima_Airlsan_other"

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

    @CreateDateColumn() 
    createdAt?: Date;

    @ManyToMany(() => AirIsan, (airIsan) => airIsan.airisan_district_id)
    airisan?: AirIsan[];

    @ManyToOne(() => AirIsan_Image_, (image) => image.arirsan_district_id)
    @JoinColumn({ name: 'airisan_imgae_id' })
    airisan_imgae?: AirIsan_Image_;
}