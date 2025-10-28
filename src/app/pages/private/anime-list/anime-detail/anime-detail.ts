import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AnimeService } from '../../../../services/anime-service';
import { Anime } from '../../../../models/anime.model';
import { tap } from 'rxjs';
import { RelatedAnimeList } from '../related-anime-list/related-anime-list';

@Component({
  selector: 'app-anime-detail',
  imports: [RelatedAnimeList],
  templateUrl: './anime-detail.html',
  styleUrl: './anime-detail.css'
})
export class AnimeDetail implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private readonly animeService = inject(AnimeService); 

  anime: WritableSignal<Anime | null> = signal<Anime | null>(null);

  ngOnInit(): void {

   const params = this.activatedRoute.snapshot.params; 
   console.log('Oggetto params', params); 

    this.animeService.getAnimeById(params['id']).pipe(
      tap((animeRes) => { this.anime.set(animeRes)})
    ).subscribe(); 
  }
}
