import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from "bcrypt"

@Entity()
@Unique(['username'])  //use for unique user or id
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @BeforeInsert()
    addId() {
        this.id = uuidv4()
    }

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'update_at' })
    update_at: Date

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }

}
