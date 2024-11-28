import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
        nullable: false
    })
    name: string

    @Column({
        length: 100,
        unique: true
    })
    email: string

    @Column()
    password: string

    @Column()
    birth_date: Date

    @Column()
    active: boolean

    @Column()
    created_at: Date

    @Column()
    updated_at: Date   

}
