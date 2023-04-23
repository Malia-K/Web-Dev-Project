import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PlannerComponent } from './planner/planner.component';
import { HabitTrackerComponent } from './habit-tracker/habit-tracker.component';

const routes: Routes = [
  {path: "sign-in", component: SignInComponent},
  {path: "sign-up", component: SignUpComponent},
  {path: "main-page", component: MainPageComponent},
  // {path: "main-page/to-do", component: MainPageComponent},
  // {path: "main-page/planner", component: PlannerComponent},
  // {path: "main-page/habit-tracker", component:HabitTrackerComponent},
  {path: "", redirectTo:"sign-in", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }