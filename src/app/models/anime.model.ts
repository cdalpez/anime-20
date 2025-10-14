export interface IAnime {
    id: number; 
    title: string; 
    description: string; 
    image: string;
    rank: number;
    genres: [];
}

export class Anime {
    id: number; 
    title: string; 
    description: string; 
    image: string;
    rank: number; 
    genres: []; 

    constructor(obj: IAnime) {
        this.id = obj.id; 
        this.title = obj.title; 
        this.description = obj.description; 
        this.image = obj.image;
        this.rank = obj.rank; 
        this.genres = obj.genres; 
    }
}


