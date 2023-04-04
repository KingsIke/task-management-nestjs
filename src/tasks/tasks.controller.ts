import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enums';
import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController')
    constructor(
        private taskservice: TasksService,
    ) { }

    @Get(':id')
    getTaskById(
        @Param('id') id: string,
        @GetUser() user: UserEntity
    ): Promise<TaskEntity> {
        return this.taskservice.getTaskById(id, user)
    }

    // @Get()
    // getTask(): Promise<TaskEntity[]> {
    //     return this.taskservice.findAll()
    // }
    @Get()
    getTaskFilter(
        @Query(ValidationPipe) filterDto: GetTasksFilterDto,
        @GetUser() user: UserEntity
    ): Promise<TaskEntity[]> {
        this.logger.verbose(`User "${user.username}" retrieving all tasks. Filter: ${JSON.stringify(filterDto)}`)
        return this.taskservice.getTaskFiltered(filterDto, user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: UserEntity
    ): Promise<TaskEntity> {
        return this.taskservice.createTask(createTaskDto, user)
    }

    @Delete(':id')
    deleteTask(
        @Param('id') id: string,
        @GetUser() user: UserEntity
    ) {
        return this.taskservice.deleteTask(id, user)
    }

    @Patch(':id')
    updateTask(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: UserEntity
    ): Promise<TaskEntity> {
        return this.taskservice.updateTask(id, status, createTaskDto, user)
    }

}
