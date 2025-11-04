import { effect, inject, Injectable, signal } from '@angular/core';
import { debounceTime, map, of } from 'rxjs';
import { AUTH_KEY_STORAGE } from '../models/enums/auth-keys.enum';
import { IUser, User } from '../models/user.model';
import { LocalstorageService } from './localstorage-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly localstorageService = inject(LocalstorageService);

  private user = signal<User | null>(null);

  currentUser = this.user.asReadonly();

  // isAuthenticated = linkedSignal(() => {
  //   const user: User | null = this.user();
  //   const token: Token | null = this.authService.currentToken();

  //   console.log('isAuthenticated', user, token);

  //   return user !== null && token !== null;
  // });

  constructor() {
    const userFromLocalstorage = this.localstorageService.getItem<User>(AUTH_KEY_STORAGE.USER);
    if (userFromLocalstorage) {
      this.user.set(userFromLocalstorage);
    }

    effect(() => {
      const user = this.user();
      if (user) this.localstorageService.setItem(AUTH_KEY_STORAGE.USER, user);
    });
  }

  getProfile() {
    const userMock: IUser = {
      id: 11,
      username: 'cdalpez',
      name: 'Christian',
      surname: 'Dal Pez',
      email: 'aCaso@gmail.com',
    } as IUser;

    return of(userMock).pipe(
      debounceTime(1500),
      map((userMock) => new User(userMock)),
      map((user) => this.user.set(user))
      // tap(() => this.localstorageService.setItem(AUTH_KEY_STORAGE.USER, this.user()))
    );
  }

  getProfileByAnotherUser() {}
}
