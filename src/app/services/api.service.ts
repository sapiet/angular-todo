import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  private baseUrl = 'https://api.todo.wip';

  constructor(private http: HttpClient) {
  }

  public getAllTodos() {
    return this.http.get(`${this.baseUrl}/api/todos`);
  }

  public addTodo(name) {
    return this.http.post(`${this.baseUrl}/api/todos`, {name});
  }

  public removeTodo(todo) {
    return this.update(todo, {deleted: true});
  }

  public updateTodoState(todo, completed) {
    return this.update(todo, {completed});
  }

  public updateTodoName(todo, name) {
    return this.update(todo, {name});
  }

  private update(todo, parameters) {
    return this.http.put(`${this.baseUrl}${todo['@id']}`, parameters);
  }
}
