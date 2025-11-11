import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AnimeService } from '../services/anime-service';
import { Anime } from '../models/anime.model';
import { catchError, delay, map } from 'rxjs';

export const animeDetailResolver: ResolveFn<Anime | null> = (route, state) => {
  const animeService = inject(AnimeService);
  const id = route.params['id'];
  if (!id) return null;
  return animeService.getAnimeById(id).pipe(
    delay(2000)
    // map(() => {
    //   throw new Error();
    // })
  );
};
