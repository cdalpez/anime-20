import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth-service';
import { UserService } from '../../../services/user-service';
import { IUserCredentials } from '../../../models/user.model';
import { catchError, debounceTime, finalize, Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly routerService = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  private readonly destroy$ = new Subject<void>();

  isLoading = signal<boolean>(false);

  onRegister() {
    this.routerService.navigate(['public', 'register']);
  }

  onLogin() {
    this.isLoading.set(true);

    // Creare oggetto di tipo ILoginCredentials
    const credentials: IUserCredentials = {
      username: 'cdalpez',
      password: 'passwordSicurissima',
    };

    this.authService
      .login(credentials)
      .pipe(
        /* debounceTime(1500), */
        switchMap((token) => this.userService.getProfile()),
        tap(() => this.routerService.navigate([''])),
        finalize(() => this.isLoading.set(false)),
        catchError((err) => {
          this.isLoading.set(false);
          return err;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    // Passare modello ad authService()
  }
}
