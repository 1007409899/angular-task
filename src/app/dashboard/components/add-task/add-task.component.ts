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
// viewchild  para acceder a los métodos del componente hijo
   @ViewChild(TaskListComponent) taskList!: TaskListComponent;
  // crear rective form
  build = inject(FormBuilder)
  todoService = inject(TaskService)
  form = this.build.group({
    title: '',
    completed: [false]
  });

  saveTask(): void {
    // Aquí se implementa la lógica para guardar la tarea
    const task = this.form.value;
    this.todoService.createTodo(task).subscribe((res) => {
     if(res){
      console.log('Task added successfully!', res);
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
