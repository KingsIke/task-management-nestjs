import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { NotFoundException } from '@nestjs/common/exceptions';





@Injectable()
export class TasksService {
    private tasks: Task[] = [];


    // creatTask(title: string, description: string): Task {
    creatTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto
        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task
    }

    getAllTask() {
        console.log('Hello World')
        return this.tasks
    }


    getFilterTask(filterDto: GetTasksFilterDto) {
        const { status, search } = filterDto;
        let filterTask = this.getAllTask()

        if (status) {
            filterTask = filterTask.filter(task => task.status === status)
        }

        if (search) {
            filterTask = filterTask.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search)
            )
        }
        return filterTask
    }

    getTaskById(id: string): Task {
        const foundId = this.tasks.find(task => task.id === id)

        if (!foundId) {
            throw new NotFoundException(`Task with ID " ${id} " not found`)
        }
        else {
            return foundId
        }
    }


    updateTaskById(id: string, status: TaskStatus, createTaskDto: CreateTaskDto): Task {
        const { description, title } = createTaskDto
        const task = this.getTaskById(id)
        task.status = status;
        task.description = description;
        task.title = title;
        return task
    }

    deleteTaskById(id: string) {
        const foundId = this.getTaskById(id);
        this.tasks = this.tasks.filter((item) => {
            return item.id !== foundId.id
        })
        return "Deleted Successful"
    }

}
