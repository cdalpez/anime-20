import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Anime } from '../../../models/anime.model';
import { AnimeItem } from './anime-item/anime-item';
import { AnimeSearch } from "./anime-search/anime-search";
import { Like } from "../../../shared/components/like/like";
import { AnimeService } from '../../../services/anime-service';
import { Pagination } from '../../../models/pagination-response.models';

@Component({
  selector: 'app-anime-list',
  imports: [AnimeItem, AnimeSearch, Like],
  templateUrl: './anime-list.html',
  styleUrl: './anime-list.css'
})
export class AnimeList implements OnInit {

  private readonly animeService = inject(AnimeService); 
  
  animeList: WritableSignal<Anime[]> = signal<Anime[]>([]);
  querySearch: WritableSignal<string> = signal<string>('');
  
  pagination: Pagination = new Pagination(); 

  filteredAnimeList = computed(() => {
    const allAnimeList = this.animeList();
    const query = this.querySearch(); 
    
    return allAnimeList.filter(anime => anime.title.toLowerCase().includes(query.toLowerCase())); 
  }); 

  ngOnInit(): void {

    this.animeService.getTopAnime().subscribe({
      next:(value) => {
        console.log('Next:', value); 
        this.animeList.set(value.data); 
        this.pagination = value.pagination; 
      }, 
      error:(err) => {
        console.log('Error:', err); 
      }, 
      complete() {  
        console.log('Complete'); 
      }
    }); 

    /* this.animeList.set([
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
    ]);  */
  }

  onSearchQueryEvent(query:string) {
    console.log('onSearchQueryEvent, ', query); 
    this.querySearch.set(query); 
  }
}
