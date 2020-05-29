import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NadrazkyModule} from "./nadrazky/nadrazky.module";

@Module({
  imports: [NadrazkyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
