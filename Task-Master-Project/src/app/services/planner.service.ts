import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  BASE_URL = "http://localhost:8000"
  constructor(private client: HttpClient) { }

  
}
