import { Module } from '@nestjs/common';
import { NearController } from './near.controller';
import {NadrazkyService} from "../nadrazky.service";
import {NadrazkaSchema} from "../nadrazky.model";
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Nadrazka', schema: NadrazkaSchema}])],
  controllers: [NearController],
  providers: [NadrazkyService]
})
export class NearModule {}
