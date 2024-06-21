import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ResponseTask } from '../../../interfaces/task.interface';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    HttpClientModule, CommonModule, FormsModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  todoService = inject(TaskService);

  todos: any[] = [];
  filteredTodos: ResponseTask[] = [];
  collectionSize!: number;
  page = 1;
  pageSize = 5;
  searchTerm: string = '';

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.todoService.getTodos().subscribe((data: ResponseTask[]) => {
      this.todos = data;
      this.collectionSize = data.length;
      this.filterTasks();
    });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe((res) => {
      if (res) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.filterTasks();
      }
    });
  }

  updateTodoStatus(todo: any): void {
    this.todoService.updateTodo(todo.id, { ...todo, completed: !todo.completed }).subscribe(updatedTodo => {
      const index = this.todos.findIndex(t => t.id === updatedTodo.id);
      if (index !== -1) {
        this.todos[index] = updatedTodo;
        this.filterTasks();
      }
    });
  }

  filterTasks(): void {
    this.filteredTodos = this.todos.filter(todo =>
      todo.title.includes(this.searchTerm.toLowerCase())
    );
    this.collectionSize = this.filteredTodos.length;
  }

  get paginatedTodos(): ResponseTask[] {
    if (this.filteredTodos) {
      return this.filteredTodos
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
    return [];
  }

  get totalPages(): number {
    return Math.ceil(this.collectionSize / this.pageSize);
  }

  isLastPage(): boolean {
    return this.page >= this.totalPages;
  }

  isFirstPage(): boolean {
    return this.page <= 1;
  }

  previousPage(): void {
    if (!this.isFirstPage()) {
      this.page--;
    }
  }

  nextPage(): void {
    if (!this.isLastPage()) {
      this.page++;
    }
  }
}
