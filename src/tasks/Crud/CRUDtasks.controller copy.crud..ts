import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
// import {  } from '@nestjs/common/pipes';
// import { Patch } from '@nestjs/common/decorators';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from '../pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './CRUDtasks.service copy';

@Controller('tasks')
export class TasksController {
    constructor(private taskservice: TasksService) { }

    // @Get('getAllTask')
    // getAllTasks(): Task[] {
    //     return this.taskservice.getAllTask()
    // }
    // I embeded it in the filter 


    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDto
    ): Task[] {
        console.log(filterDto)
        if (Object.keys(filterDto).length) {
            return this.taskservice.getFilterTask(filterDto)
        }
        else {
            return this.taskservice.getAllTask()

        }
    }

    @Post('createTask')
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string
    // ) { //use when validation
    @UsePipes(ValidationPipe)
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
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @Body() createTaskDto: CreateTaskDto
    ): Task {
        return this.taskservice.updateTaskById(id, status, createTaskDto)

    }

    @Delete(':id')
    deleteTaskById(@Param('id') id: string) {
        return this.taskservice.deleteTaskById(id)
    }


}
