import { Routes } from '@angular/router';
import { alreadyAuthenticatedGuard } from '../../guards/already-authenticated-guard';
import { confirmToExitGuard } from '../../guards/confirm-to-exit-guard';

export default [
  {
    path: '',
    canActivateChild: [alreadyAuthenticatedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login').then((c) => c.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register').then((c) => c.Register),
        canDeactivate: [confirmToExitGuard],
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  /* {
        path: '',
        redirectTo: 'public/login',
        pathMatch: 'full'
    } */
] as Routes;
