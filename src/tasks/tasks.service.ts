import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enums';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';
import { v4 as uuidv4 } from 'uuid';
// import { Repository } from 'typeorm';
// import { Task, TaskStatus } from './task.model';
// import { v1 as uuidv1 } from 'uuid';
// import { CreateTaskDto } from './dto/create-task.dto'
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { NotFoundException } from '@nestjs/common/exceptions';





@Injectable()
export class TasksService {
    constructor(
        private readonly taskRepository: TaskRepository

    ) { }

    // ---------------GET BY ID ------------------------
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
    // ==========================GET ALL / GET BY FILTER ==================
    async getTaskFiltered(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {

        return this.taskRepository.getFiltered(filterDto)

    }


    //////////////////////// DELETE BY ID /////////////////////
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

    /*               CREATE TASK                          */
    async createTask(createTaskDto: CreateTaskDto) {

        return this.taskRepository.createTask(createTaskDto)
    }
    async updateTask(id: string, status: TaskStatus, createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        const { title, description } = createTaskDto

        const task = await this.getTaskById(id)
        task.status = status;
        task.description = description
        task.title = title
        await task.save()
        return task
    }

}
