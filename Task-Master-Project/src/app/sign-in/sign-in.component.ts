import {Component, EventEmitter, Inject, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog'

import { AuthService } from 'src/app/services/auth.service';
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

  constructor(private signInService: AuthService) {
  }

  signInForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  signIn(): void {
    console.log(this.isLoggedIn)
    this.signInService.signIn(this.username, this.password).subscribe((data) => {
      localStorage.setItem('token', data.token);
      this.isLoggedIn = true;
      console.log(this.isLoggedIn)
      this.validLogin.emit({isLoggedIn: this.isLoggedIn, username: this.username, password: this.password})
    })
    console.log(this.isLoggedIn)
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      if (this.signInForm.value.login && this.signInForm.value.password) {
        this.username= this.signInForm.value.login;
        this.password = this.signInForm.value.password;
        this.signIn();
      }
      // this.dialogRef.close(this.signInForm.value);
    }
  }

}
