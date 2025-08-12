import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { runSeeders } from './seeders';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('Multi-Tenant App')
    .setDescription('API documentation for your app')
    .setVersion('1.0')
    .addBearerAuth() // If using JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Global Filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Global Interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  //  run seeder for add roles in DB
  // runSeeders();
  await app.listen(PORT, () => {
    console.log(`Server Are running on http://localhost:${PORT}`);
  });
}
bootstrap();
