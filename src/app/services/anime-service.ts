import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAnimeListResponse, IAnimeResponse } from '../models/anime-response.model';
import { Anime, AnimeList } from '../models/anime.model';
import { Pagination } from '../models/pagination-response.models';
import { IRelatedAnime, RelatedAnime } from '../models/relatedAnime.model';

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


  getAnimeById(id: number): Observable<Anime> {
    return this.http.get<{data: IAnimeResponse}>(`${this.baseUrl}/anime/${id}`).pipe(
      map((res) => {
        console.log('getAnimeById', res); 
        return new Anime(res.data); 
      })
    ); 
  }


  getAnimeRelated(id: number): Observable<RelatedAnime[]> {
    return this.http.get<{data: IRelatedAnime[]}>(`${this.baseUrl}/anime/${id}/recommendations`).pipe(
      map((res) => {
        /* console.log('getAnimeRelated.res', res);  */
        return res.data.map(relAnime => new RelatedAnime(relAnime)); 
      })
    )
  }

}
