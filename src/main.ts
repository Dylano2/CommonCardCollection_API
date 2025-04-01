import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log('Serveur démarré : http://localhost:' + port);
  console.log('Playground GraphQL : http://localhost:' + port + '/graphql');
}

bootstrap();
