import {Component, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required])
  });

  constructor(private signUpService: AuthService, private router : Router) {};

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
    
      const username = formData.username;
      const email = formData.email;
      const password = formData.password;
      const first_name = formData.first_name;
      const last_name = formData.last_name;

      console.log(username)
      console.log(email)
      console.log(first_name)
      console.log(last_name)
      console.log(password)

    

      if (username && first_name && last_name && email && password) {
        this.signUpService.signUp(username,  email,password,  first_name, last_name).subscribe((data) => {
          console.log(data);
          alert("User was succesfully created")
          this.router.navigateByUrl("/sign-in")
        });
      }
    }
  };






}

