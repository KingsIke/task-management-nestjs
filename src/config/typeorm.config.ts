import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config'
import { UserEntity } from "src/auth/user.entity";
import { TaskEntity } from "src/tasks/task.entity";

require('dotenv').config()

const dbConfig = config.get('db')
export const typeOrmConfig: TypeOrmModuleOptions = {

    type: dbConfig.type,
    host: process.env.DB_HOSTNAME || dbConfig.host,
    port: process.env.DB_PORT || dbConfig.port,
    username: process.env.DB_USERNAME || dbConfig.username,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_NAME || dbConfig.database,
    entities: [TaskEntity, UserEntity],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
    autoLoadEntities: dbConfig.autoLoadEntities,
}



