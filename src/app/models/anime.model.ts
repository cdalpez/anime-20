/* export interface IAnime {
    id: number; 
    title: string; 
    description: string; 
    image: string;
    rank: number;
    genres: [];
}
*/

import { Demographic, IAnimeListResponse, IAnimeResponse } from "./anime-response.model";
import { Pagination } from "./pagination-response.models";


export class AnimeList {
    data: Anime[]; 
    pagination: Pagination;

    constructor(obj: IAnimeListResponse) {
        this.data = obj.data.map(anime => new Anime(anime)); 
        this.pagination = new Pagination(obj.pagination); 
    }
}

export class Anime {
    id: number; 
    title: string; 
    description: string; 
    image: string;
    score: number; 
    genres: AnimeGenres[]; 
    startDate: Date;
    isFavourite: boolean; 

    constructor(obj: IAnimeResponse) {
        this.id = obj.mal_id; 
        this.title = obj.title; 
        this.description = obj.synopsis; 
        this.image = obj.images.webp.image_url;
        this.score = obj.score; 
        this.genres = obj.genres.map(genre => new AnimeGenres(genre)); 
        this.startDate = new Date(obj.aired.from); 
        this.isFavourite = false;
    }

    toggleFavourite() {
        this.isFavourite = !this.isFavourite; 
    }
}


export class AnimeGenres {
    name: string; 

    constructor(obj: Demographic) {
        this.name = obj.name; 
    }
}   


