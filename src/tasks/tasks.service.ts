import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto'





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

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id)
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
        this.tasks = this.tasks.filter((item) => {
            return item.id !== id
        })
        return "Deleted Successful"
    }

}
