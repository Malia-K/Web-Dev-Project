import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HabitTrackerComponent } from './habit-tracker/habit-tracker.component';
import { PlannerComponent } from './planner/planner.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToDoComponent } from './to-do/to-do.component';
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SignInComponent,
    SignUpComponent,
    HabitTrackerComponent,
    PlannerComponent,
    ToDoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports : [PlannerComponent]
})
export class AppModule { }
