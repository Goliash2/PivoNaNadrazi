import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  // const fs = require('fs');
  // const httpsOptions = {
  //   key: fs.readFileSync('/etc/letsencrypt/live/flyapp.fd.cvut.cz/privkey.pem'),
  //   cert: fs.readFileSync('/etc/letsencrypt/live/flyapp.fd.cvut.cz/fullchain.pem'),
  // };
  const app = await NestFactory.create(AppModule, {
    // httpsOptions,
  });
  app.use(helmet());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
