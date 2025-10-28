import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Anime, AnimeList } from '../models/anime.model';
import { IAnimeListResponse } from '../models/anime-response.model';
import { Pagination } from '../models/pagination-response.models';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  
  private readonly baseUrl = 'https://api.jikan.moe/v4'; 
  private readonly http = inject(HttpClient); 

  getTopAnime(pagination: Pagination): Observable<AnimeList> {

    const params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('limit', pagination.items.toString());

    return this.http.get<IAnimeListResponse>(`${this.baseUrl}/top/anime`, { params }).pipe(
      map((resp: IAnimeListResponse) => {
        return new AnimeList(resp)
      })
    );
  }

}
