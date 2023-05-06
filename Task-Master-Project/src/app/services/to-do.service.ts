import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../to-do/models/models';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  BASE_URL = "http://localhost:8000"
  constructor(private client:HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.client.get<Category[]>(
      `${this.BASE_URL}/api/categories`
    )
  }

  getTasks():Observable<Task[]>{
    return this.client.get<Task[]>(
      `${this.BASE_URL}/api/tasks`
    )
  }


  createCategory(title:string, user : any):Observable<Category>{
    return this.client.post<Category>(`${this.BASE_URL}/api/categories/`,
      {
        title : title,
        user: user
      }
    )
  }

  deleteCategory(category_id: number): Observable<any> {
    return this.client.delete(`${this.BASE_URL}/api/categories/${category_id}/`)
  }

}
