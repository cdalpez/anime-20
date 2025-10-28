import { Component, effect, inject, input, OnInit } from '@angular/core';
import { AnimeService } from '../../../../services/anime-service';
import { RelatedAnime } from '../../../../models/relatedAnime.model';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-related-anime-list',
  imports: [],
  templateUrl: './related-anime-list.html',
  styleUrl: './related-anime-list.css'
})
export class RelatedAnimeList implements OnInit {

  // Input è sempre richiesto
  animeId = input<number>();
  private readonly animeService = inject(AnimeService); 

  relatedAnime: RelatedAnime[] = []; 

  constructor() {
    effect(() => {
      /* const id = this.animeId(); 
      if (id) {
        this.animeService.getAnimeRelated(id).pipe(
          tap((relAnimeRes) => this.relatedAnime.push(...relAnimeRes)),
          catchError((err) => {
            console.log('getAnimeRelated.err', err); 
            return EMPTY; 
          })
        ).subscribe();
      } */
    })
  }

  ngOnInit(): void {

    const id = this.animeId(); 
      if (id) {
        this.animeService.getAnimeRelated(id).pipe(
          tap((relAnimeRes) => this.relatedAnime = relAnimeRes),
          catchError((err) => {
            console.log('getAnimeRelated.err', err); 
            return EMPTY; 
          })
        ).subscribe();
      } 
  }
}
