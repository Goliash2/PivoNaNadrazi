import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {NadrazkyService} from '../nadrazky.service';

@Controller('api/nadrazky-near')
export class NearController {
    constructor(private readonly nadrazkyService: NadrazkyService) {
    }

    @Post()
    async getNearNadrazky(@Body() completeBody: {
        lat: number,
        lng: number,
        maxdist: number
    }) {
        // console.log(completeBody.lng + ', '+ completeBody.lat + ', ' + completeBody.maxdist);
        return await this.nadrazkyService.getNearNadrazky(completeBody.lat, completeBody.lng, completeBody.maxdist);
        // return locNadrazky // .map((nadr) => {id: nadr._id});
    }
}
