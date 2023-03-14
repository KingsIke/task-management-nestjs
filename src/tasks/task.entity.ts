import { type } from 'os';
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
// import { TaskStatus } from './Crud/task.model';
import { TaskStatus } from './task-status.enums';
// import uuidv4 from 'uuid/v4'
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class TaskEntity extends BaseEntity {
    // @PrimaryColumn({ type: 'uuid' })
    // id!: string;
    @PrimaryGeneratedColumn("uuid")
    id: string;
    // @Column()
    // @Generated('uuid')
    // uuid: string

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