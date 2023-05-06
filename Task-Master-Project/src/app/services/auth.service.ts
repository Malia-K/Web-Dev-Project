import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {AuthToken, SignUpToken, User} from '../models'
import {Observable} from "rxjs";
import jwtDecode from 'jwt-decode';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = "http://localhost:8000"
  // private jwtHelper : JwtHelperService;

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


  getUser():User{
    var user: User | undefined;
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      const decodedToken:User= jwtDecode(token);
      console.log(decodedToken)
      user = {
        id: decodedToken.id,
        username: decodedToken.username,
        email: decodedToken.email,
        first_name : decodedToken.first_name,
        last_name:decodedToken.last_name
      };

      
    }
    
    return user || { id: 0, username: '', email: '', first_name: '', last_name: '' };

  }


}
