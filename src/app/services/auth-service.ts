import { IToken } from './../models/token.model';
import { computed, Injectable, signal } from '@angular/core';
import { IUserCredentials } from '../models/user.model';
import { debounceTime, map, of } from 'rxjs';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly token = signal<Token | null>(null);
  readonly currentToken = this.token.asReadonly();

  login(credentials: IUserCredentials) {
    return of(credentials).pipe(
      debounceTime(1500),
      map(() => {
        return {
          accessToken: 'lbrjbvlkrvnprqvnrqpjixmqiobgqpimgxbqpgupqxrgbpqxugp5qugqjpgjqnpg',
          refreshToken: '24224141421412241412'
        } as IToken
      }),
      map((token) => {
        this.token.set( new Token(token));
      })
    );
  }


}
