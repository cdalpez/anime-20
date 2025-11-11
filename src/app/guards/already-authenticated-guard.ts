import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user-service';
import { AuthService } from '../services/auth-service';

export const alreadyAuthenticatedGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    return router.createUrlTree(['']);
  }
  return true;
};
