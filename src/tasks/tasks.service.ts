import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enums';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';
// import { Task, TaskStatus } from './task.model';
// import { v1 as uuidv1 } from 'uuid';
// import { CreateTaskDto } from './dto/create-task.dto'
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { NotFoundException } from '@nestjs/common/exceptions';





@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskEntity)
        private taskRepository: TaskRepository

    ) { }

    async getTaskById(id: string): Promise<TaskEntity> {
        console.log('this.taskRepository', this.taskRepository)
        const found = await this.taskRepository.findOne({
            where: {
                id,
            },
        })

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" `)
        } else {

            return found
        }
    }
    async findAll(): Promise<TaskEntity[]> {
        return await this.taskRepository.find()
    }

    async deleteTask(id: string): Promise<DeleteResult> {
        try {

            const result = await this.taskRepository.delete(id)
            if (result.affected === 0) {
                throw new BadRequestException(`Task with Id "${id}" not found`)
            }
            return result

        } catch (error) {
            throw new BadRequestException(error)
        }

    }


    async createTask(createTaskDto: CreateTaskDto) {
        // const { title, description } = createTaskDto

        // const task = new TaskEntity()
        // task.description = description;
        // task.title = title
        // task.status = TaskStatus.OPEN
        const task = await this.taskRepository.create(createTaskDto)
        await task.save()

        return task
    }

}
