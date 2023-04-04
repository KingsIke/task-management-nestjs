import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { UserEntity } from 'src/auth/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enums';
import { TaskEntity } from './task.entity';

@Injectable()

export class TaskRepository extends Repository<TaskEntity> {
    private logger = new Logger
    constructor(private dataSource: DataSource) {
        super(TaskEntity, dataSource.createEntityManager())

    }

    // ******************************** GET ALL ELEMENT AND BY FILTER**********************

    async getFiltered(
        filterDto: GetTasksFilterDto,
        user: UserEntity
    ): Promise<TaskEntity[]> {

        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id })

        if (status) {
            query.andWhere('task.status = :status', { status })
        }
        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })

        }
        try {

            const tasks = await query.getMany()
            return tasks
        } catch (error) {
            this.logger.error(`Failed to get task for user "${user.username}", DTO: ${JSON.stringify(filterDto)}`, error.stack)
            throw new InternalServerErrorException()
        }
    }

    // ===================================== CREATE TASK ====================================
    async createTask(
        createTaskDto: CreateTaskDto,
        user: UserEntity
    ) {
        const { title, description } = createTaskDto

        const task = new TaskEntity()
        task.description = description;
        task.title = title
        task.status = TaskStatus.OPEN;
        task.user = user;

        try {
            await task.save()

        } catch (error) {
            this.logger.error(`Failed to create a task for user ${user.username}, Data: ${createTaskDto} `, error.stack)
            throw new InternalServerErrorException()
        }
        delete task.user

        return task
    }
}
