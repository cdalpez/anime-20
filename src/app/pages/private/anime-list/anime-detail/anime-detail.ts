import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { AnimeService } from '../../../../services/anime-service';
import { Anime } from '../../../../models/anime.model';
import { EMPTY, iif, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { RelatedAnimeList } from '../related-anime-list/related-anime-list';

@Component({
  selector: 'app-anime-detail',
  imports: [RelatedAnimeList],
  templateUrl: './anime-detail.html',
  styleUrl: './anime-detail.css'
})
export class AnimeDetail implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>(); 
  
  private activatedRoute = inject(ActivatedRoute);
  private readonly animeService = inject(AnimeService); 

  anime: WritableSignal<Anime | null> = signal<Anime | null>(null);

  ngOnInit(): void {

   /* const params = this.activatedRoute.snapshot.params;  */
   this.activatedRoute.params.pipe(
    map((params) => params['id']),
    switchMap((id) => 
      iif(() => id, this.animeService.getAnimeById(id).pipe(
        tap((animeRes) => { this.anime.set(animeRes)})
      ), 
      EMPTY
    )
    ),
    takeUntil(this.destroy$)
   ).subscribe(); 
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete(); 
  }

}
