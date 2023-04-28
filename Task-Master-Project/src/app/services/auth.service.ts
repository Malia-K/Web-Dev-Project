import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {AuthToken, SignUpToken} from '../models'
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = "http://localhost:8000"

  constructor(private client: HttpClient) { }

  signIn(username: string, password: string): Observable<AuthToken> {
    return this.client.post<AuthToken>(`${this.BASE_URL}/api/sign-in/`, {username, password});
  }
  signUp(username: string, email: string, password: string, firstName: string, lastName: string):
    Observable<SignUpToken> {
    return this.client.post<SignUpToken>(`${this.BASE_URL}/api/sign-up/`, {username, email, password, firstName, lastName});
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !token;
  }
}
