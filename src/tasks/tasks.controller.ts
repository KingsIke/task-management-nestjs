import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskservice: TasksService) { }

    @Get()
    getAllTasks(): Task[] {
        return this.taskservice.getAllTask()
    }

    @Post('create')
    createTask(
        @Body('title') title: string,
        @Body('description') description: string
    ) { //use when validation

        // createTask(title: string, description: string) {
        return this.taskservice.creatTask(title, description)
    }

}
