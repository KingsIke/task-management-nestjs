import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
// import { v1 as uuidv1 } from 'uuid';
import { v1 as uuidv1 } from 'uuid';





@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTask() {
        console.log('Hello World')
        return this.tasks
    }

    creatTask(title: string, description: string): Task {
        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task
    }

}
