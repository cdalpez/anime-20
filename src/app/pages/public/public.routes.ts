import { Routes } from '@angular/router';

export default [
    {
        path: '',
        children: [
            {
                path: 'login',
                loadComponent: () => import('./login/login').then(c => c.Login) 
            }, 
            {
                path: 'register',
                loadComponent: () => import('./register/register').then(c => c.Register)
            },
            {
                path: '',
                redirectTo: 'login', 
                pathMatch: 'full'
            }
        ]
    }, 
    /* {
        path: '',
        redirectTo: 'public/login', 
        pathMatch: 'full'
    } */
] as Routes;
