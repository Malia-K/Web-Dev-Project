import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Task } from '../to-do/models/models';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  BASE_URL = "http://localhost:8000"
  constructor(private client:HttpClient) { }

  getCategories(user_id : number):Observable<Category[]>{
    return this.client.get<Category[]>(
      `${this.BASE_URL}/api/${user_id}/categories`
    )
  }


  createCategory(title:string,user_id: number):Observable<Category>{
    return this.client.post<Category>(`${this.BASE_URL}/api/${user_id}/categories/`,
      {
        title : title,
        user: user_id
      }
    )
  }

  createTask(description:string,user_id: number, category_id : number): Observable<Task>{
    return this.client.post<Task>(`${this.BASE_URL}/api/${user_id}/tasks/`,
      {
        description : description,
        completed : false,
        category: category_id
      }
    )
  }

  deleteCategory(category_id: number, user_id: number): Observable<any> {
    return this.client.delete(`${this.BASE_URL}/api/${user_id}/categories/${category_id}`)
  }


  getTasksByCategory(category_id: number, user_id: number) : Observable<Task[]>{
    return this.client.get<Task[]>(
      `${this.BASE_URL}/api/${user_id}/categories/${category_id}/tasks/`
    )
  }

  
  getTasks(user_id : number):Observable<Task[]>{
    return this.client.get<Task[]>(
      `${this.BASE_URL}/api/${user_id}/tasks`
    )
  }



  deleteTask(task_id: number, user_id:number): Observable<any> {
    return this.client.delete(`${this.BASE_URL}/api/${user_id}/tasks/${task_id}`)
  }

}
