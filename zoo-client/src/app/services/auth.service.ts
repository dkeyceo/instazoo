import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public login (user: any): Observable<any> {
    return this.httpClient.post(AUTH_API + 'signin', {
      username: user.username,
      password: user.password
    });
  }

  public register (user: any): Observable<any> {
    return this.httpClient.post(AUTH_API + 'signup', {
      username: user.username,
      password: user.password,
      email: user.getemail,
      firstname: user.firstname,
      lastname: user.lastname,
      confirmPassword: user.confirmPassword
    });
  }
}
