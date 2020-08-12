import { ITodo } from './../interface/interface';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todos: ITodo[] = [];

  checkTodos = new BehaviorSubject(true);

  constructor(private http: HttpClient) { }

  getAllTodos(id) {
    return new Promise<ITodo[]>((resolve, reject) => {

      this.http.get(`${environment.api}/todo`).subscribe(data => {
        this.todos = data['todos'];
        const userTodos: ITodo[] = this.todos.filter(x => x.userId === id);
        resolve(userTodos);
      });
    });
  }

  markCompleted(id) {
    return this.http.put(`${environment.api}/todo/${id}`, { completed: true });
  }

  addTodo(todo, userid) {
    return this.http.post(`${environment.api}/todo/${userid}`, { title: todo });
  }

}
