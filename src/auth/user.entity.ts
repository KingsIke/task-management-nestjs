import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    username: string;

    @Column()
    password: string;

    @BeforeInsert()
    addId() {
        this.id = uuidv4()
    }

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'update_at' })
    update_at: Date

}
