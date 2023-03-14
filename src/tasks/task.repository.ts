// import { Repository } from 'typeorm';
// import { TaskEntity } from './task.entity'


// export class TaskRepository extends Repository<TaskEntity>{

// }

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enums';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
    // async createTask(createTaskDto: CreateTaskDto) {
    //     const { title, description } = createTaskDto

    //     const task = new TaskEntity()
    //     task.description = description;
    //     task.title = title
    //     task.status = TaskStatus.OPEN

    //     await task.save()

    //     return task
    // }
}

// import { Injectable } from '@nestjs/common';
// import { Connection, Repository } from 'typeorm';
// import { TaskEntity } from './task.entity';

// @Injectable()
// export class TaskRepository extends Repository<TaskEntity> {
//     constructor(connection: Connection) {
//         super(connection.getRepository(TaskEntity));
//     }
//     async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
//         const { title, description } = createTaskDto

//         const task = new TaskEntity()
//         task.description = description;
//         task.title = title
//         task.status = TaskStatus.OPEN

//         await task.save()

//         return task
//     }
// }