import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NadrazkyModule} from "./nadrazky/nadrazky.module";

@Module({
  imports: [
    NadrazkyModule,
    MongooseModule.forRoot(process.env.DATABASE_URL)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
