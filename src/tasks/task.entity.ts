import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
// import { TaskStatus } from './Crud/task.model';
import { TaskStatus } from './task-status.enums';

@Entity()
export class TaskEntity extends BaseEntity {
    // @PrimaryColumn({ type: 'uuid' })
    // id!: string;
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'update_at' })
    update_at: Date

}