import {Component, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [{provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: {}}]
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  });

  constructor(private signUpService: AuthService, public dialogRef: MatDialogRef<SignUpComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {};

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      const username = formData.username;
      const email = formData.email;
      const password = formData.password;
      const firstName = formData.firstName;
      const lastName = formData.lastName;
    }
    this.dialogRef.close()
  };

  onCancel(): void {
    this.dialogRef.close()
  };
}

