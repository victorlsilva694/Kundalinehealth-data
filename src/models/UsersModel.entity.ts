import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    birthDate: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    isAdmin: number;
}
