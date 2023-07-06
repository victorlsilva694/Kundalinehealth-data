import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Professionals {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    specialty: string;

    @Column()
    ProfessionalRegistration: string;

    @Column()
    email: string;

    @Column()
    telefone: string;
}
