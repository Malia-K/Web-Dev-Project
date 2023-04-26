import { Component, OnInit } from '@angular/core';
import { Category, Todo } from './models/models';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit{
  categories: Category[] = [
    {id: 1, title: "Webka"}, {id:2, title: "baska sabak"}, {id: 3, title:"3 category"},{id: 4, title:"3 category"}  
  ];
  todos: Todo[] = [
    {id:1, description:"something to dokfhnvkushfvhsfkvhkhvkjhfvkhvkhh   webka", completed:false, category:1},
    {id:1, description:"something to dokfhnvkushfvhsfkvhkhvkjhfvkhvkhh   webka", completed:false, category:1},
    {id:1, description:"something to dokfhnvkushfvhsfkvhkhvkjhfvkhvkhh   webka", completed:false, category:1},
    {id:3, description:"something to do 3 cat", completed:false, category:3},
  ];


  cat_todos : Todo[] = []
  

  ngOnInit(): void {
    
  }


  getTodos(cat_id:number){
    for(let i of this.todos){
      if(i.category == cat_id){
        this.cat_todos.push(i)
      }
    }
  }






}
