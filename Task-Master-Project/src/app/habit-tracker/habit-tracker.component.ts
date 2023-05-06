import { Component, OnInit } from '@angular/core';
import { Habit } from './models/habit';
import { FormControl, FormGroup } from '@angular/forms';
import { HabitService } from '../services/habit.service';



@Component({
  selector: 'app-habit-tracker',
  templateUrl: './habit-tracker.component.html',
  styleUrls: ['./habit-tracker.component.css']
})


export class HabitTrackerComponent implements OnInit{
  // title(title: any) {
  //   throw new Error('Method not implemented.');
  // }
  public adding = false;

  public editing = false;
  public editingIndex!: number;
  habits: Habit[] = [
    // <Habit>{
    //   name: '15 Minute Walk',
    //   frequency: 'Daily',
    //   isDone: false,
    //   description:
    //     'This habit makes my kitchen look nice and makes my day better the next morning.',
    //   likes: 0,
    // },
    // <Habit>{
    //   name: 'Weed the Garden',
    //   frequency: 'Weekly',
    //   isDone: false,
    //   description:
    //     'The weeds get so out of hand if they wait any longer, and I like how nice our home looks with a clean lawn.',
    //   likes: 0,
    // },
  ];
  constructor(private habitsService: HabitService){}
  ngOnInit(): void {
    this.habitsService.getHabits(6).subscribe((data)=>{
      this.habits = data;
    })
    console.log(this.habits)
    
  }

  
  public habitForm = new FormGroup({
    name: new FormControl(''),
    frequency: new FormControl(''),
    description: new FormControl(''),
    likes: new FormControl(0)
  });

  public onSubmit() {
    const habit = this.habitForm.value as Habit;

    if (this.editing) {
      this.habits.splice(this.editingIndex, 1, habit);
      this.habitForm.reset();
    } else {
      this.habitsService.createHabit(habit.name, habit.frequency, habit.description, 6).subscribe((habit:Habit) =>
      {
        this.habits.push(habit);
        this.habitForm.reset();
      })
      
    }

    this.editing = false;
    this.adding = false;
  }

  

  public setEditForm(habit: Habit, index: number) {
    this.habitForm.patchValue({
      name: habit.name,
      frequency: habit.frequency,
      description: habit.description,
      
    });
    this.editing = true;
    this.editingIndex = index;
  }

  public onDelete(index: number) {
    this.habits.splice(index, 1);
  }

  exitForm() {
    this.adding = false;
    this.editing = false;
    this.habitForm.reset();
  }


  
  onClick(habit: Habit) {
    habit.isDone = !habit.isDone
    console.log(this.habits)
    // this.bgColor = habit.isDone ? 'green' : 'rgb(220, 36, 36)';
  }

  incrementLikes(habit: Habit) {
    habit.likes ++;
  }

}

