import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

const USER_API = 'http://localhost:8080/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserById(id: number): Observable<User>{
    return this.httpClient.get<User>(USER_API+id);
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(USER_API);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.post<User>(USER_API+'update', user);
  }

}
