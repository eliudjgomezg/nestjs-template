import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api')
  app.enableCors()
  //   app.use(new < MiddlewareName > Middleware().use); Adding middleware in all app
  await app.listen(process.env.PORT || 5003);
}
bootstrap();

