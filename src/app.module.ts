import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskEntity } from './tasks/task.entity';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule { }
