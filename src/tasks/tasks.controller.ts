import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';

// import { CreateTaskDto } from './dto/create-task.dto';
// import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
// import { Task, TaskStatus } from './Crud/task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskservice: TasksService) { }



}
