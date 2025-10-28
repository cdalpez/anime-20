import { IAnimeImages } from "./anime-response.model";

export interface IRelatedAnime {
    entry: Entry;
    url:   string;
    votes: number
}

export interface Entry {
    mal_id: number;
    url:    string;
    images: IAnimeImages;
    title:  string;
}

export interface Image {
    image_url:       string;
    small_image_url: string;
    large_image_url: string;
}


export class RelatedAnime {
    id: number; 
    title: string; 
    img: string;

    constructor(obj: IRelatedAnime) {
        this.id = obj.entry.mal_id; 
        this.title = obj.entry.title; 
        this.img = obj.entry.images.webp.image_url; 
    }

}