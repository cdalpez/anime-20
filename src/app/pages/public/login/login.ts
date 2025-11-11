import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { catchError, finalize, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { IUserCredentials } from '../../../models/user.model';
import { AuthService } from '../../../services/auth-service';
import { UserService } from '../../../services/user-service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    FloatLabel,
    CardModule,
    ToastModule,
    JsonPipe,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [MessageService],
})
export class Login {
  private readonly routerService = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  private readonly messageService = inject(MessageService);

  private readonly destroy$ = new Subject<void>();

  isLoading = signal<boolean>(false);

  userCredentials: IUserCredentials = {
    username: '',
    password: '',
  };

  onRegister() {
    this.routerService.navigate(['public', 'register']);
  }

  onLogin() {
    this.isLoading.set(true);

    // Creare oggetto di tipo ILoginCredentials
    // const credentials: IUserCredentials = {
    //   username: 'cdalpez',
    //   password: 'passwordSicurissima',
    // };

    if (this.userCredentials.username === '' || this.userCredentials.password === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Username e password sono obbligatori',
      });
      this.isLoading.set(false);
      return;
    }

    this.authService
      .login(this.userCredentials)
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
