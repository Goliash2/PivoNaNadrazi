import {Injectable, NotFoundException} from '@nestjs/common';
import {Beer, Changelog, Comment, Image, Nadrazka, NadrazkaNear, OpeningHours, SocialLink} from './nadrazky.model';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import {max} from 'rxjs/operators';

@Injectable()
export class NadrazkyService {

    constructor(@InjectModel('Nadrazka') private readonly nadrazkaModel: Model<Nadrazka>) {
    }

    async getAllNadrazky() {
        const nadrazky = await this.nadrazkaModel.find().exec();
        return nadrazky as Nadrazka[];
    }

    async getNearNadrazky(lat: number, lng: number, maxDist: number) {
        const nadrazky = await this.nadrazkaModel.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    distanceField: "dist.calculated",
                    maxDistance: maxDist,
                    spherical: true
                }
            }]).exec();
        return nadrazky as NadrazkaNear[];
    }

    async getNadrazka(nadrazkaId: string) {
        return await this.findNadrazka(nadrazkaId);
    }

    async updateNadrazka(
        id: string,
        name: string,
        station: string,
        type: string,
        status: string,
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
        },
        changelog: Changelog[]
    ) {
        await this.findNadrazka(id).then((updatedNadrazka) => {
            if (name) {
                updatedNadrazka.name = name;
            }
            if (station) {
                updatedNadrazka.station = station;
            }
            if (type) {
                updatedNadrazka.type = type;
            }
            if (status) {
                updatedNadrazka.status = status;
            }
            if (introImage) {
                updatedNadrazka.introImage = introImage;
            }
            if (history) {
                updatedNadrazka.history = history;
            }
            if (website) {
                updatedNadrazka.website = website;
            }
            if (location) {
                updatedNadrazka.location = location;
            }
            if (changelog) {
                updatedNadrazka.changelog = changelog;
            }
            updatedNadrazka.save();
        });
    }

    private async findNadrazka(nadrId: string): Promise<Nadrazka> {
        let nadrazka;
        try {
            nadrazka = await this.nadrazkaModel.findById(nadrId).exec();
        } catch (e) {
            throw new NotFoundException('Could not find the pub');
        }
        if (!nadrazka) {
            throw new NotFoundException('Could not find the pub');
        }
        return nadrazka;
    }

    async insertNadrazka(
        name: string,
        station: string,
        type: string,
        status: string,
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
        },
        changelog: Changelog[]
    ) {
        const newNadrazka = new this.nadrazkaModel({
            name: name, // typescript shortcut allow to just write variable, if it have same name - used below
            station,
            type,
            status,
            introImage,
            images,
            comments,
            history,
            website,
            socialLinks,
            openingHours,
            beers,
            location,
            changelog
        });
        const result = await newNadrazka.save();
        return result.id as string;
        //
    }

    async deleteNadrazka(nadrId: string) {
        const result = await this.nadrazkaModel.deleteOne({_id: nadrId}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find the pub');
        }
    }
}
