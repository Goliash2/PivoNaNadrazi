import {Body, Controller, Get, Post, Param} from '@nestjs/common';
import {NadrazkyService} from "./nadrazky.service";
import {Beer, Image, Comment, OpeningHours, SocialLink} from "./nadrazky.model";

@Controller('nadrazky')

export class NadrazkyController {
    constructor(private readonly nadrazkyService: NadrazkyService) {
    }

    @Get()
    getAllNadrazky() {
        return this.nadrazkyService.getAllNadrazky();
    }

    @Get(':id')
    getNadrazka(@Param('id') id: string) {
        return this.nadrazkyService.getNadrazka(id);
    }

    @Post()
    addNadrazka(@Body() completeBody: {
        id: string,
        name: string,
        station: string,
        type: string,
        introImage: string,
        images: Image[],
        comments: Comment[],
        history: string,
        website: string,
        socialLinks: SocialLink[],
        openingHours: OpeningHours[],
        beers: Beer[],
        location: {
            lat: number,
            lng: number
        }
    }): any {
        this.nadrazkyService.insertNadrazka(
            completeBody.id,
            completeBody.name,
            completeBody.station,
            completeBody.type,
            completeBody.introImage,
            completeBody.images,
            completeBody.comments,
            completeBody.history,
            completeBody.website,
            completeBody.socialLinks,
            completeBody.openingHours,
            completeBody.beers,
            completeBody.location
        );
    }
}
