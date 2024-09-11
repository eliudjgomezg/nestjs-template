import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorHandlerException } from './exceptions/HandlerErrorException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api')
  app.enableCors()
  app.useGlobalFilters(new ErrorHandlerException());
  //   app.use(new < MiddlewareName > Middleware().use); Adding middleware in all app
  await app.listen(process.env.PORT || 8000);
}
bootstrap();

