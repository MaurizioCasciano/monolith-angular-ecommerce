import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../../../src/app/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isLoggedIn = new BehaviorSubject(false);
  private readonly client = inject(HttpClient);

  constructor() {
    const userId = window.localStorage.getItem('userId');
    this.isLoggedIn.next(!!userId);
  }

  get isLoggedIn$() {
    return this.isLoggedIn.asObservable();
  }

  login(email: string, password: string): Observable<boolean> {
    return this.client.get<User[]>(`${environment.api}/users?email=${email}&password=${password}`).pipe(
      map((users) => {
        const isSuccess = users.length === 1;
        this.isLoggedIn.next(isSuccess);
        return { isSuccess, user: users[0] };
      }),
      tap(({ isSuccess, user }) => {
        if (!isSuccess) {
          return;
        }

        window.localStorage.setItem('username', user.username);
        window.localStorage.setItem('userId', `${user.id}`);
      }),
      map(({ isSuccess }) => isSuccess)
    )
  }

  logout() {
    this.isLoggedIn.next(false);
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('userId');
  }
}
