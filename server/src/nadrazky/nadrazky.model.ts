export class Nadrazka {
    constructor(
        public id: string,
        public name: string,
        public station: string,
        public type: string,
        public introImage: string,
        public comments: object[],
        public history: string,
        public website: string,
        public socialLink: string,
        public openingHours: object[],
        public location: {
            lat: number,
            lng: number
        }
    ) {
    }
}
