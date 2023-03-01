import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
// import { Patch } from '@nestjs/common/decorators';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskservice: TasksService) { }

    @Get('getAllTask')
    getAllTasks(): Task[] {
        return this.taskservice.getAllTask()
    }

    @Post('createTask')
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string
    // ) { //use when validation
    createTask(@Body() createTaskDto: CreateTaskDto) {

        return this.taskservice.creatTask(createTaskDto)

        // return this.taskservice.creatTask(title, description)

    }
    @Get(':id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskservice.getTaskById(id)
    }

    @Patch(':id')
    updateTask(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
        @Body() description, title: CreateTaskDto
    ): Task {
        return this.taskservice.updateTaskById(id, status, description)

    }

    @Delete(':id')
    deleteTaskById(@Param('id') id: string) {
        return this.taskservice.deleteTaskById(id)
    }


}
