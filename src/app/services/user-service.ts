import { computed, inject, Injectable, signal } from '@angular/core';
import { IUser, User } from '../models/user.model';
import { debounceTime, map, of } from 'rxjs';
import { AuthService } from './auth-service';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private readonly authService = inject(AuthService); 

  private user = signal<User | null>(null);

  isAuthenticated = computed(() => {
    const user: User | null = this.user(); 
    const token: Token | null = this.authService.currentToken(); 

    return user !== null && token !== null; 
  }); 
  
  getProfile() {

    const userMock: IUser = {
      id: 11,
      username: 'cdalpez',
      name: 'Christian',
      surname: 'Dal Pez',
      email: 'aCaso@gmail.com',
    } as IUser

    return of(userMock).pipe(
      debounceTime(1500), 
      map((userMock) => new User(userMock))
    )
  }


}
