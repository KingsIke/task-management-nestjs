import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DataSource} from 'typeorm';
// import * as config from './ormconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  // const connection = await DataSource(config);
  await app.listen(3100);
}
bootstrap();
