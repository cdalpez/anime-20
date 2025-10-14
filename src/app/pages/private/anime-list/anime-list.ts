import { Component, computed, OnInit, signal, WritableSignal } from '@angular/core';
import { Anime } from '../../../models/anime.model';
import { AnimeItem } from './anime-item/anime-item';
import { AnimeSearch } from "./anime-search/anime-search";
import { Like } from "../../../shared/components/like/like";

@Component({
  selector: 'app-anime-list',
  imports: [AnimeItem, AnimeSearch, Like],
  templateUrl: './anime-list.html',
  styleUrl: './anime-list.css'
})
export class AnimeList implements OnInit {
  
  animeList: WritableSignal<Anime[]> = signal<Anime[]>([]);
  querySearch: WritableSignal<string> = signal<string>('');
  
  filteredAnimeList = computed(() => {
    const allAnimeList = this.animeList();
    const query = this.querySearch(); 
    
    return allAnimeList.filter(anime => anime.title.toLowerCase().includes(query.toLowerCase())); 
  }); 

  ngOnInit(): void {
    this.animeList.set([
      {
        id: 1,
        title: 'Anime Test',
        description: 'Anime Description',
        image: '',
        rank: 0,
        genres: []
      },
      {
        id: 2,
        title: 'Anime Numero 2',
        description: 'Anime Description',
        image: '',
        rank: 0,
        genres: []
      },
      {
        id: 3,
        title: 'Anime Numero 3',
        description: 'Anime Description',
        image: '',
        rank: 0,
        genres: []
      },
      {
        id: 4,
        title: 'Anime Numero 4',
        description: 'Anime Description',
        image: '',
        rank: 0,
        genres: []
      }
    ]); 
  }

  onSearchQueryEvent(query:string) {
    console.log('onSearchQueryEvent, ', query); 
    this.querySearch.set(query); 
  }
}
