import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  innerComponent : string = "";

  logged: boolean = false;

  constructor(private router:Router){}
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
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
