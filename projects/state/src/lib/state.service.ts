import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'platform'
})
export class StateService {
  private readonly isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }

  set logged(value: boolean){
    this.isLoggedIn.next(value);
  }

  get isLoggedIn$() {
    return this.isLoggedIn.asObservable();
  }
}
