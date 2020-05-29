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

export class Nadrazka {
    constructor(
        public id: string,
        public name: string,
        public station: string,
        public type: string,
        public introImage: string,
        public images: Image[],
        public comments: Comment[],
        public history: string,
        public website: string,
        public socialLinks: SocialLink[],
        public openingHours: OpeningHours[],
        public beers: Beer[],
        public location: {
            lat: number,
            lng: number
        }
    ) { }
}
