import { 
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    BeforeInsert,
    BeforeUpdate
} from "typeorm";

import User from "./users";

import bcrypt from 'bcrypt';

@Entity('credentials')
export default class Credential {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Column()
    public password: string

    @CreateDateColumn()
    public createdAt: string

    @UpdateDateColumn()
	public updatedAt: Date;

	@DeleteDateColumn()
	public deletedAt?: Date;

    @OneToOne(() => User, (user) => user.credential)
    user: User;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(): void {
        this.password = bcrypt.hashSync(this.password, 10)
    }
}