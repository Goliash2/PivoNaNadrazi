import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NadrazkyModule} from "./nadrazky/nadrazky.module";

@Module({
  imports: [NadrazkyModule, MongooseModule.forRoot('mongodb://localhost:27017/pivonanadrazi')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
