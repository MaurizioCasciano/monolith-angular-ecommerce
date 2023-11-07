import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../../../src/app/models';
import {StateService} from "./state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly client = inject(HttpClient);
  private readonly state = inject(StateService);

  constructor() {
    const userId = window.localStorage.getItem('userId');
    this.state.logged = !!userId;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.client.get<User[]>(`${environment.api}/users?email=${email}&password=${password}`).pipe(
      map((users) => {
        const isSuccess = users.length === 1;
        this.state.logged = isSuccess;
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
    this.state.logged = false;
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('userId');
  }
}
