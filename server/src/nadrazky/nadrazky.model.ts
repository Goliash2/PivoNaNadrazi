import * as mongoose from 'mongoose';

export interface OpeningHours {
    id: string;
    dayNumber: number;
    from: string;
    till: string;
}

export interface Beer {
    id: string;
    name: string;
    price: number;
    brewery: string;
    size: number;
    updated: string;
}

export interface Comment {
    id: string;
    user: string;
    text: string;
    inserted: string;
}

export interface SocialLink {
    id: string;
    type: string;
    name: string;
    link: string;
}

export interface Image {
    id: string;
    name: string;
    link: string;
}

export const NadrazkaSchema = new mongoose.Schema({
    name: String,
    station: String,
    type: String,
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
    }
});

export interface Nadrazka {
    _id: string;
    name: string;
    station: string;
    type: string;
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
}
