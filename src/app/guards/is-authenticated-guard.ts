import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('isAuthenticatedGuard', route, 'isAuthenticated', authService.isAuthenticated());

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['public']);
};
