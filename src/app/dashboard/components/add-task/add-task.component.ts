import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ResponseTask } from '../../interfaces/task.interface';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,TaskListComponent, HttpClientModule, ReactiveFormsModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
   @ViewChild(TaskListComponent) taskList!: TaskListComponent;
  build = inject(FormBuilder)
  todoService = inject(TaskService)
  form = this.build.group({
    title: '',
    completed: [false]
  });

  saveTask(): void {
    const task: ResponseTask = this.form.value as ResponseTask
    this.todoService.createTodo(task).subscribe((res) => {
     if(res){
      this.taskList.fetchTodos();
      this.form.reset();
     }
    });
  }
  procesaPropagar(event: ResponseTask) {
    this.form.setValue({
      title: event.title,
      completed : event.completed!
    })
  }



 }
