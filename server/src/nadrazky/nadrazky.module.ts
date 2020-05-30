import {Module} from "@nestjs/common";
import {NadrazkyController} from "./nadrazky.controller";
import {NadrazkyService} from "./nadrazky.service";
import {MongooseModule} from "@nestjs/mongoose";
import {NadrazkaSchema} from "./nadrazky.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Nadrazka', schema: NadrazkaSchema}])],
    controllers: [NadrazkyController],
    providers: [NadrazkyService]
})
export class NadrazkyModule {

}
