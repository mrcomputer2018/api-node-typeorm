import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export default class User {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 100, nullable: false })
    name: string

    @Column('varchar',{ length: 100, unique: true, nullable: false })
    email: string

    @Column('varchar',{ length: 100, nullable: false })
    password: string

    @Column('date', { nullable: false })
    birth_date: Date

    @Column('boolean', { default: true, nullable: false })
    active: boolean

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date   

}
