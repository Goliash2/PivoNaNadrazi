import {Module} from "@nestjs/common";
import {NadrazkyController} from "./nadrazky.controller";
import {NadrazkyService} from "./nadrazky.service";

@Module({
    controllers: [NadrazkyController],
    providers: [NadrazkyService]
})
export class NadrazkyModule {

}
