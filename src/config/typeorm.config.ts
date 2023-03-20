import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "src/auth/user.entity";
import { TaskEntity } from "src/tasks/task.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '453622',
    database: 'taskmanagement',
    entities: [TaskEntity, UserEntity],
    synchronize: true,
    autoLoadEntities: true,
}



