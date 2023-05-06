import { Component, OnInit } from '@angular/core';
import { Category, Task } from './models/models';
import { ToDoService } from '../services/to-do.service';
import { User } from '../models';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit{
  categories: Category[] = [];
  todos: Task[] = [];
  user: User | undefined;




  inputTodo : string = ""

  public adding = false;

  public editing = false;


  constructor(private todoService:ToDoService){}

  

  ngOnInit(): void {
    // const token = localStorage.getItem('auth_token');
    // if(token){
    //   const decodedToken = jwtDecode(token)
    //   // this.user = {
    //   //   id: decodedToken.user_id,
    //   //   username : decodedToken.username
    //   // }
    // }



    this.todoService.getCategories(6).subscribe((data)=>
      this.categories = data
    )

    this.todoService.getTasks(6).subscribe((data)=>
      this.todos = data
    )


  }


  addCategory(){
    this.adding = true
  }
    

  saveCategory(inputCategory : string){
    // console.log(cat_id)
    if(inputCategory.length != 0){
      // const cat = new Category(this.categories.length + 1, inputCategory, 6)
      // this.categories.push(cat)

      // console.log(this.categories)
      this.todoService.createCategory(inputCategory, 6).subscribe((category:Category)=>
        {
          this.categories.push(category)
        }
      )
      this.adding = false

    }
  }

  deleteCategory(catID : number){
    // const selectedCategory = this.getCategoryById(catID)
    this.todoService.deleteCategory(catID, 6).subscribe((data) => {
      this.categories= this.categories.filter((Category) => Category.id !== catID);
    });
  }
  

  
  addTodo(cat_id: number, inputTodo:string): void{
    // console.log(cat_id)
    if(inputTodo.length != 0){
      this.todoService.createTask(inputTodo, 6, cat_id).subscribe((task:Task) =>
        {
          this.todos.push(task)
        }
      )
      inputTodo = ""
      // inputData = ""
    }

  }


  completeTodo(todoID: number){
    this.todoService.deleteTask(todoID, 6).subscribe((data) => {
      this.todos= this.todos.filter((Task) => Task.id !== todoID);
    });

  }

  // getTodoById(todoID:number):Todo{
  //   for(let todo of this.todos){
  //     if(todo.id == todoID){
  //       return todo
  //     }
  //   }
  //   return {} as Todo
  // }


  getCategoryById(catID:number):Category{
    for(let cat of this.categories){
      if(cat.id == catID){
        return cat
      }
    }
    return {} as Category
  }




  exitForm() {
    this.adding = false;
    // this.editing = false;
  }






}
