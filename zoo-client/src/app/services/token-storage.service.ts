import { Injectable } from '@angular/core';
import { User } from '../models/User';

const TOKEN_KEY = 'auth-token';
const USER_KEY  = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser() {
    return sessionStorage.getItem(USER_KEY);
  }
  logOut(){
    window.sessionStorage.clear();
    window.location.reload()
  }

}
