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

export interface Nadrazka {
    id: string;
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
