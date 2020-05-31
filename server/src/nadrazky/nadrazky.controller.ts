import {Body, Controller, Get, Post, Param, Patch, Delete} from '@nestjs/common';
import {NadrazkyService} from "./nadrazky.service";
import {Beer, Image, Comment, OpeningHours, SocialLink} from "./nadrazky.model";

@Controller('nadrazky')

export class NadrazkyController {
    constructor(private readonly nadrazkyService: NadrazkyService) {
    }

    @Get()
    async getAllNadrazky() {
        return await this.nadrazkyService.getAllNadrazky();
        // return locNadrazky // .map((nadr) => {id: nadr._id});
    }

    @Get(':id')
    getNadrazka(@Param('id') id: string) {
        return this.nadrazkyService.getNadrazka(id);
    }

    @Post()
    async addNadrazka(@Body() completeBody: {
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
    }) {
        const generatedId = await this.nadrazkyService.insertNadrazka(
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
        return { id: generatedId };
    }

    @Patch(':id')
    async updateNadrazka(@Param('id') nadrId: string, @Body() completeBody: {
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
    }) {
        await this.nadrazkyService.updateNadrazka(
            nadrId,
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
        return null;
    }

    @Delete(':id')
    async deleteNadrazka(@Param('id') nadrId: string){
        await this.nadrazkyService.deleteNadrazka(nadrId);
        return null;
    }
}
