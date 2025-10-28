import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'private', 
        loadChildren: () => import ('./pages/private/private.routes')
    }, 
    {
        path: '',
        redirectTo: 'private',
        pathMatch: 'full'
    }
];
