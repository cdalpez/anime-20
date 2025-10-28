import { Component, effect, inject, input, OnInit } from '@angular/core';
import { AnimeService } from '../../../../services/anime-service';
import { RelatedAnime } from '../../../../models/relatedAnime.model';
import { tap } from 'rxjs';

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
      const id = this.animeId(); 
      if (id) {
        this.animeService.getAnimeRelated(id).pipe(
          tap((relAnimeRes) => this.relatedAnime.push(...relAnimeRes))
        ).subscribe();
      }
    })
  }

  ngOnInit(): void {

    

    setTimeout(() => {
      /* console.log('animeId', this.animeId()); 
      this.animeService.getAnimeRelated(this.animeId()).pipe(
        tap((relAnimeRes) => this.relatedAnime.push(...relAnimeRes))
      ).subscribe();  */
    }, 1000);
    
  }
}
