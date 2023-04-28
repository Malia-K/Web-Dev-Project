import {Component, EventEmitter, Inject, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  @Output() validLogin = new EventEmitter<{isLoggedIn: boolean, username: string, password: string}>();

  isLoggedIn: boolean;
  username: string;
  password: string;

  constructor(private signInService: AuthService, public dialogRef: MatDialogRef<SignInComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isLoggedIn = data.isLoggedIn;
    this.username = data.username;
    this.password = data.password;
  }

  signInForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  signIn(): void {
    this.signInService.signIn(this.username, this.password).subscribe((data) => {
      localStorage.setItem('token', data.token);
      this.isLoggedIn = true;
      this.validLogin.emit({isLoggedIn: this.isLoggedIn, username: this.username, password: this.password})
    })
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      if (this.signInForm.value.login && this.signInForm.value.password) {
        this.username= this.signInForm.value.login;
        this.password = this.signInForm.value.password;
        this.signIn();
      }
      this.dialogRef.close(this.signInForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
