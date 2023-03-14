import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TaskEntity } from "src/tasks/task.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '453622',
    database: 'taskmanagement',
    entities: [TaskEntity],
    synchronize: true,
    autoLoadEntities: true,
}



