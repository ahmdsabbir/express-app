import { 
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, 
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToOne
} from "typeorm";

import Credential from "./credentials";


@Entity('users')
export default class User {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        unique: true
    })
    public username: string;

    @Column()
    public password: string;

    @Column({
        unique: true
    })
    public email: string

    @Column({
        default: true
    })
    public isVerified: boolean;

    @Column({
        enum: ['USER', 'ADMIN', 'SUPER_ADMIN'],
        default: 'USER'
    })
    public role: string;

    @Column({
        enum: ['ACTIVE', 'INACTIVE', 'BANNED'],
        default: 'ACTIVE'
    })
    public status: string;

    @CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@DeleteDateColumn()
	public deletedAt?: Date;

    @OneToOne(() => Credential, (credential) => credential.user, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
    public credential: Credential;
}