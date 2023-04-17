import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
// import { PlannerComponent } from './planner/planner.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SignInComponent,
    SignUpComponent,
    // PlannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // exports : [PlannerComponent]
})
export class AppModule { }
