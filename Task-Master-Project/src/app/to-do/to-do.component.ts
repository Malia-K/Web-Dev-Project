import { Component, OnInit } from '@angular/core';
import { Category, Todo } from './models/models';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  animations:[
    trigger('simpleFadeAnimation', 
      [transition(':leave',
    animate(400, style({opacity: 0})))
    ])
  ]
})
export class ToDoComponent implements OnInit{
  categories: Category[] = [
    {id: 1, title: "Webka"}, {id:2, title: "baska sabak"}, {id: 3, title:"3 category"},{id: 4, title:"4 category"}  
  ];
  todos: Todo[] = [
    
  ];


  inputTodo : string = ""

  public adding = false;

  public editing = false;



  

  ngOnInit(): void {
    this.todos = [{id:1, description:"something to dokfhnvkush fvhsfkvhkhvkjhfvkhvkhh   webka", completed:false, category:2},
    {id:2, description:"something to dokfhnvkushfvhsfkv hkhvkjhfvkhvkhh   webka", completed:false, category:4},
    {id:4, description:"something to dokfhnvkushfvhsfkvh khvkjhfvkhvkhh   webka", completed:false, category:2},
    {id:3, description:"something to do 3 cat", completed:false, category:3},]
  }



  addTodo(cat_id: number, inputTodo:string): void{
    console.log(cat_id)
    if(inputTodo.length != 0){
      const todo = new Todo(this.todos.length, inputTodo, false, cat_id)
      this.todos.push(todo)

      console.log(this.todos)
      inputTodo = ""
      // inputData = ""
    }

  }

  completeTodo(todoID: number){
    let completedTodo = this.getTodoBuId(todoID)

    completedTodo.completed = true

  }

  getTodoBuId(todoID:number):Todo{
    for(let todo of this.todos){
      if(todo.id == todoID){
        return todo
      }
    }
    return {} as Todo
  }

  updateTodo(todoID: number){
  
  }






}
