import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enums';
import { TaskEntity } from './task.entity';

@Injectable()

export class TaskRepository extends Repository<TaskEntity> {
    constructor(private dataSource: DataSource) {
        super(TaskEntity, dataSource.createEntityManager())

    }

    // ******************************** GET ALL ELEMENT AND BY FILTER**********************

    async getFiltered(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {

        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status })
        }
        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })

        }
        const tasks = await query.getMany()
        return tasks
    }

    // ===================================== CREATE TASK ====================================
    async createTask(createTaskDto: CreateTaskDto) {
        const { title, description } = createTaskDto

        const task = new TaskEntity()
        task.description = description;
        task.title = title
        task.status = TaskStatus.OPEN

        await task.save()

        return task
    }
}
