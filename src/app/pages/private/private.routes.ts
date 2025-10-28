import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import ('./private').then((c) => c.Private),
        children: [
            {
            path: 'home',
            loadChildren: () => import('./anime-list/anime-list.routes')
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
        ]
    }
] as Routes; 