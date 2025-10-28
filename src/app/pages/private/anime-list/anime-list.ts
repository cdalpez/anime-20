import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Anime } from '../../../models/anime.model';
import { AnimeItem } from './anime-item/anime-item';
import { AnimeSearch } from "./anime-search/anime-search";
import { Like } from "../../../shared/components/like/like";
import { AnimeService } from '../../../services/anime-service';
import { Pagination } from '../../../models/pagination-response.models';
import { HandleButtons } from '../../../shared/components/handle-buttons/handle-buttons';
import { InfiniteScrollDirective } from '../../../shared/directives/infinite-scroll';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anime-list',
  imports: [AnimeItem, AnimeSearch, HandleButtons, InfiniteScrollDirective],
  templateUrl: './anime-list.html',
  styleUrl: './anime-list.css'
})
export class AnimeList implements OnInit {
  
  private readonly animeService = inject(AnimeService); 
  
  animeList: WritableSignal<Anime[]> = signal<Anime[]>([]);
  querySearch: WritableSignal<string> = signal<string>('');
  
  pagination: WritableSignal<Pagination> = signal<Pagination>(new Pagination()); 

  filteredAnimeList = computed(() => {
    const allAnimeList = this.animeList();
    const query = this.querySearch(); 
    
    return allAnimeList.filter(anime => anime.title.toLowerCase().includes(query.toLowerCase())); 
  }); 

  ngOnInit(): void {
    this.loadAnime(); 
  }

  loadAnime() {

    if (this.pagination().isLoading || !this.pagination().hasNextPage) return; 

    // Aggiorna il signal di pagination
    this.updatePagination({isLoading: true, page: this.pagination().page + 1}); 

    this.animeService.getTopAnime(this.pagination()).subscribe({
      next:(value) => {
        console.log('Next:', value); 

        this.animeList.update((currList) => {
          return [...currList, ...value.data]; 
        }); 

        this.updatePagination({
          isLoading: false,
          hasNextPage: value.pagination.hasNextPage,
        }); 
      }, 
      error:(err) => {
        console.log('Error:', err); 
      }, 
      complete() {  
        console.log('Complete'); 
      }
    }); 
  }

  onSearchQueryEvent(query:string) {
    console.log('onSearchQueryEvent, ', query); 
    this.querySearch.set(query); 
  }

  onScrolled() {
    console.log('onScrolled()'); 
  }

  private updatePagination(pagination: Partial<Pagination>) {
    this.pagination.update((currPagination) => {
      return {...currPagination, ...pagination}
    }); 
  }
}
