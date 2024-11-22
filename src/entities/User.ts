import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    create_at: Date;
    static findOne: any;
}