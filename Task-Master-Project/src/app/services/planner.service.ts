import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { EventInput } from '@fullcalendar/core';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  BASE_URL = "http://localhost:8000"
  constructor(private http: HttpClient) { }
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/api/events/`);

  }

  addEvent(event: EventInput) {
    let id = event.id;
    let title = event.title;
    let start_time = event.start + 'T00:00:00';
    let end_time = event.end + 'T03:00:00';
    return this.http.post(`${this.BASE_URL}/api/events/`, {id, title, start_time, end_time});
  }

  updateEvent(event: EventInput) {
    return this.http.put(`${this.BASE_URL}/api/events/${event.id}/`, event);
  }

  deleteEvent(eventId: string) {
    return this.http.delete(`${this.BASE_URL}/api/events/${eventId}/`);
  }
}
