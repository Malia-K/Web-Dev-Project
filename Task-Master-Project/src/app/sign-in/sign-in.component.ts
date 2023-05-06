import {Component, EventEmitter, Inject, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { ActivatedRoute, Route, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models';
import jwtDecode from 'jwt-decode';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],

  providers: []

})
export class SignInComponent  {
  @Output() validLogin = new EventEmitter<{isLoggedIn: boolean, username: string, password: string}>();

  isLoggedIn: boolean = false;
  username: string = "";
  password: string = "";
  isLoading : boolean = false;

  user: User = { id: 0, username: '', email: '', first_name: '', last_name: '' };

  constructor(private signInService: AuthService, private router : Router) {
  }

  signInForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  signIn(): void {
    this.isLoading = true
    this.signInService.signIn(this.username, this.password).subscribe(
      data => {
     
        localStorage.setItem('token', data.token);
        this.isLoggedIn = true;
        
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
          const decodedToken:User= jwtDecode(data.token);
          console.log(decodedToken)
          this.user = {
            id: decodedToken.id,
            username: decodedToken.username,
            email: decodedToken.email,
            first_name : decodedToken.first_name,
            last_name:decodedToken.last_name
          };

          
        }

        // this.user = this.signInService.getUser()

        this.validLogin.emit({isLoggedIn: this.isLoggedIn, username: this.username, password: this.password})
        
        setTimeout(() => {
          
          this.router.navigateByUrl(`${this.user.id}/main-page`)
          this.isLoading = false;
        }, 1500);

        
      },
      
      error => {
        this.router.navigateByUrl("/sign-in")
        alert ("Such user does not exist. Please try again..")
        this.isLoading = false
      }
      
    
      
      )

  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      if (this.signInForm.value.login && this.signInForm.value.password) {
        this.username= this.signInForm.value.login;
        this.password = this.signInForm.value.password;
        this.signIn();
      }
    }
  }

}
