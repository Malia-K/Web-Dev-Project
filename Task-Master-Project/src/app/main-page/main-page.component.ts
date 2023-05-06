import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  innerComponent : string = "";
  logged: boolean = false;
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
  }
  constructor(private router : Router) {
  }
  changePage(selectedPage:string){
    this.innerComponent = selectedPage;
  }

  logout() {
    localStorage.removeItem('token')
    this.logged = false
    this.router.navigateByUrl("/sign-in")
  }
}
