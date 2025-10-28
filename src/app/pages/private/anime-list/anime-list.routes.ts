import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./anime-list').then((c) => c.AnimeList)
    },
    {
        path: ':id',                // Carica il componente in dettaglio
        loadComponent: () => import('./anime-detail/anime-detail').then((c) => c.AnimeDetail)
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
] as Routes; 