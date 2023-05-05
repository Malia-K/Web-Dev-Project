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

  // getUsers():Observable<User[]>{
  //   return this.client.get<User[]>(
  //     `${this.BASE_URL}/api/users/`
  //   )
  // }

  signIn(username: string, password: string): Observable<AuthToken> {
    return this.client.post<AuthToken>(`${this.BASE_URL}/api/sign-in/`, {username, password});
  }
  signUp(username: string, email: string, password: string, first_name: string, last_name: string):Observable<SignUpToken> {
    
    console.log(username)
    console.log(email)
    console.log(first_name)
    console.log(last_name)
    console.log(password)
    return this.client.post<SignUpToken>(`${this.BASE_URL}/api/sign-up/`, {username, email, first_name, last_name, password});
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !token;
  }
}
