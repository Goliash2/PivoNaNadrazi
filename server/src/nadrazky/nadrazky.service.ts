import {Injectable, NotFoundException} from '@nestjs/common';
import {Beer, Comment, Image, Nadrazka, OpeningHours, SocialLink} from './nadrazky.model';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';

@Injectable()
export class NadrazkyService {
    private nadrazky: Nadrazka[] = [];

    constructor(@InjectModel('Nadrazka') private readonly nadrazkaModel: Model<Nadrazka>) {
    }

    getAllNadrazky() {
        return [...this.nadrazky];
    }

    getNadrazka(id: string) {
        const nadrazka = this.nadrazky.find((pub) => pub._id === id);
        if (!nadrazka) {
            throw new NotFoundException('Could not find the pub');
        }
        return {...nadrazka};
    }

    insertNadrazka(
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
    ) {
        const newNadrazka = new this.nadrazkaModel({
            name: name, // typescript shortcut allow to just write variable, if it have same name - used below
            station,
            type,
            introImage,
            images,
            comments,
            history,
            website,
            socialLinks,
            openingHours,
            beers,
            location
        });
        newNadrazka.save().then((res) => {
            console.log(res);
            return "dummy id";
        });
        //
    }
}
