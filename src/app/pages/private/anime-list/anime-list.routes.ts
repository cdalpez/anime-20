import { Routes } from '@angular/router';
import { animeDetailResolver } from '../../../resolvers/anime-detail-resolver';

export default [
  {
    path: '',
    loadComponent: () => import('./anime-list').then((c) => c.AnimeList),
  },
  {
    path: ':id', // Carica il componente in dettaglio
    loadComponent: () => import('./anime-detail/anime-detail').then((c) => c.AnimeDetail),
    resolve: {
      detailAnime: animeDetailResolver,
    },
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
] as Routes;
