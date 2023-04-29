import { Component, OnInit } from '@angular/core';
import { Category, Todo } from './models/models';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit{
  categories: Category[] = [
    // {id: 1, title: "Webka"}, {id:2, title: "baska sabak"}, {id: 3, title:"3 category"},{id: 4, title:"4 category"}  
  ];
  todos: Todo[] = [
    
  ];


  inputTodo : string = ""

  public adding = false;

  public editing = false;



  

  ngOnInit(): void {
    // this.todos = [{id:1, description:"something to dokfhnvkush fvhsfkvhkhvkjhfvkhvkhh   webka", completed:false, category:2},
    // {id:2, description:"something to dokfhnvkushfvhsfkv hkhvkjhfvkhvkhh   webka", completed:false, category:4},
    // {id:4, description:"something to dokfhnvkushfvhsfkvh khvkjhfvkhvkhh   webka", completed:false, category:2},
    // {id:3, description:"something to do 3 cat", completed:false, category:3},]
  }


  
  addTodo(cat_id: number, inputTodo:string): void{
    console.log(cat_id)
    if(inputTodo.length != 0){
      const todo = new Todo(this.todos.length + 1, inputTodo, false, cat_id)
      this.todos.push(todo)

      console.log(this.todos)
      inputTodo = ""
      // inputData = ""
    }

  }

  completeTodo(todoID: number){
    let completedTodo = this.getTodoById(todoID)

    completedTodo.completed = true

  }

  getTodoById(todoID:number):Todo{
    for(let todo of this.todos){
      if(todo.id == todoID){
        return todo
      }
    }
    return {} as Todo
  }


  getCategoryById(catID:number):Category{
    for(let cat of this.categories){
      if(cat.id == catID){
        return cat
      }
    }
    return {} as Category
  }


  updateTodo(todoID: number){
  
  }


  deleteCategory(catID : number){
    // const selectedCategory = this.getCategoryById(catID)
    this.categories.forEach((value, id)=>{
      if(value.id == catID){
        this.categories.splice(id, 1);
      }}
    );
  }

  exitForm() {
    this.adding = false;
    // this.editing = false;
  }

  //  onSubmit() {
  //   // const habit = this.habitForm.value as Habit;

  //   // if (this.editing) {
  //   //   this.habits.splice(this.editingIndex, 1, habit);
  //   //   this.habitForm.reset();
  //   // } else {
  //   //   this.habits.push(habit);
  //   //   this.habitForm.reset();
  //   // }

  //   this.editing = false;
  //   this.adding = false;
  // }

  addCategory(){
    this.adding = true
  }
    

  saveCategory(inputCategory : string){
    // console.log(cat_id)
    if(inputCategory.length != 0){
      const cat = new Category(this.categories.length + 1, inputCategory)
      this.categories.push(cat)

      console.log(this.categories)
      this.adding = false

    }
  }
  






}
