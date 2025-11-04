import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './guards/is-authenticated-guard';
import { AuthService } from './services/auth-service';

export const routes: Routes = [
  {
    path: 'private',
    loadChildren: () => import('./pages/private/private.routes'),
    // loadComponent: () => import('./pages/private/private').then((c) => c.Private),
    data: {
      level: 100,
    },
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: 'public',
    loadChildren: () => import('./pages/public/public.routes'),
  },
  {
    path: '',
    // redirectTo: 'private',
    redirectTo: (state) => {
      const authService = inject(AuthService);
      if (authService.isAuthenticated()) {
        return 'private';
      } else {
        return 'public';
      }
      // return 'public';
    },
    pathMatch: 'full',
  },
];
