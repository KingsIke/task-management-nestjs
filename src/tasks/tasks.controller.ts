import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';

// import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
// import { Task, TaskStatus } from './Crud/task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskservice: TasksService) { }

    @Get(':id')
    getTaskById(@Param('id') id: string): Promise<TaskEntity> {
        return this.taskservice.getTaskById(id)
    }

    @Get()
    getTask(): Promise<TaskEntity[]> {
        return this.taskservice.findAll()
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        return this.taskservice.createTask(createTaskDto)
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        return this.taskservice.deleteTask(id)
    }




}
