import { IToken } from './../models/token.model';
import { computed, effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { IUserCredentials, User } from '../models/user.model';
import { debounce, debounceTime, delay, map, of, tap, timer } from 'rxjs';
import { Token } from '../models/token.model';
import { LocalstorageService } from './localstorage-service';
import { AUTH_KEY_STORAGE } from '../models/enums/auth-keys.enum';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly localstorageService = inject(LocalstorageService);
  private readonly userService = inject(UserService);
  private readonly token = signal<Token | null>(null);

  private readonly isAuthenticated$ = linkedSignal(() => {
    const user: User | null = this.userService.currentUser();
    const token: Token | null = this.currentToken();

    return user !== null && token !== null;
  });

  public readonly currentToken = this.token.asReadonly();
  public readonly isAuthenticated = this.isAuthenticated$.asReadonly();

  constructor() {
    const tokenFromLocalstorage = this.localstorageService.getItem<Token>(AUTH_KEY_STORAGE.TOKEN);
    if (tokenFromLocalstorage) {
      this.token.set(tokenFromLocalstorage);
    }

    effect(() => {
      const token = this.token();
      if (token) this.localstorageService.setItem(AUTH_KEY_STORAGE.TOKEN, token);
    });
  }

  login(credentials: IUserCredentials) {
    return of(credentials).pipe(
      delay(1500),
      map(() => {
        return {
          accessToken: 'lbrjbvlkrvnprqvnrqpjixmqiobgqpimgxbqpgupqxrgbpqxugp5qugqjpgjqnpg',
          refreshToken: '24224141421412241412',
        } as IToken;
      }),
      // tap((token) => this.localstorageService.setItem(this.KEY_TOKEN, token)),
      map((token) => {
        this.token.set(new Token(token));
        return token;
      })
    );
  }

  logout() {
    return of([]).pipe(
      delay(1500),
      tap(() => this.localstorageService.removeItem(AUTH_KEY_STORAGE.TOKEN)),
      tap(() => this.localstorageService.removeItem(AUTH_KEY_STORAGE.USER)),
      tap(() => this.isAuthenticated$.set(false))
    );
  }
}
