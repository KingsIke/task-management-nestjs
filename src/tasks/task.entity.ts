import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { TaskStatus } from './task-status.enums';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class TaskEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @BeforeInsert()
    addId() {
        this.id = uuidv4()
    }

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'update_at' })
    update_at: Date

}