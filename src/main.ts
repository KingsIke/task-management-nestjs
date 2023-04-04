import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'
// import { DataSource} from 'typeorm';
// import * as config from './ormconfig';

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  // const connection = await DataSource(config);
  const port = 3100
  await app.listen(port);
  logger.log(`Application listening in port ${port}`)
}
bootstrap();
