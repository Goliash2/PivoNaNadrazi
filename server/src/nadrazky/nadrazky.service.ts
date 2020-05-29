import {Injectable, NotFoundException} from '@nestjs/common';
import {Beer, Comment, Image, Nadrazka, OpeningHours, SocialLink} from './nadrazky.model';

@Injectable()
export class NadrazkyService {
    private nadrazky: Nadrazka[] = [];

    getAllNadrazky() {
        return [...this.nadrazky];
    }

    getNadrazka(id: string) {
        const nadrazka = this.nadrazky.find((pub) => pub.id === id);
        if (!nadrazka) {
            throw new NotFoundException('Could not find the pub');
        }
        return {...nadrazka};
    }

    insertNadrazka(
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
    ) {
        const newNadrazka = new Nadrazka(
            id,
            name,
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
        );
        return id;
    }
}
