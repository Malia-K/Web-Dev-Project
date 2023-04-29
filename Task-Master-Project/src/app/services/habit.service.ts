import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habit } from '../habit-tracker/models/habit';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  BASE_URL = 'http://127.0.0.1:8000'

  constructor(private client: HttpClient) { }

  getHabits():Observable<Habit[]> {
    return this.client.get<Habit[]>(
      `${this.BASE_URL}/api/habits`
    )
  }
}
