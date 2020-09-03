import * as mongoose from 'mongoose';

export interface OpeningHours {
    dayNumber: number;
    from: string;
    till: string;
}

export interface Beer {
    name: string;
    price: number;
    brewery: string;
    size: number;
    updated: string;
}

export interface Comment {
    user: string;
    text: string;
    inserted: string;
}

export interface SocialLink {
    type: string;
    name: string;
    link: string;
}

export interface Image {
    name: string;
    link: string;
    inserted: string;
}

export interface Changelog {
    log: string;
    inserted: string;
}

export const NadrazkaSchema = new mongoose.Schema({
    name: String,
    station: String,
    type: String,
    status: String,
    introImage: String,
    images: Array,
    comments: Array,
    history: String,
    website: String,
    socialLinks: Array,
    openingHours: Array,
    beers: Array,
    location: {
        lat: Number,
        lng: Number
    },
    changelog: Array
});

export interface Nadrazka extends mongoose.Document {
    id: string;
    name: string;
    station: string;
    type: string;
    status: string;
    introImage: string;
    images: Image[];
    comments: Comment[];
    history: string;
    website: string;
    socialLinks: SocialLink[];
    openingHours: OpeningHours[];
    beers: Beer[];
    location: {
        lat: number,
        lng: number
    };
    changelog: Changelog[];
}

export interface NadrazkaNear extends Nadrazka {
    dist: {
        calculated: number
    };
}
