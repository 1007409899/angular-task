import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseTask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/todos`;

  constructor(private http: HttpClient) { }

  getTodos(): Observable<ResponseTask[]> {
    return this.http.get<ResponseTask[]>(this.apiUrl);
  }

  deleteTodo(id: string): Observable<ResponseTask> {
    return this.http.delete<ResponseTask>(`${this.apiUrl}/${id}`);
  }

  updateTodo(id: number, todo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, todo);
  }

  createTodo(todo: ResponseTask): Observable<any> {
    return this.http.post<any>(this.apiUrl, todo);
  }
}
