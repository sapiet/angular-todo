import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { EMPTY } from 'rxjs';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {
  }

  loadTodos = createEffect(() => this.actions$.pipe(
    ofType('[Todos Page] Load Todos'),
    mergeMap(() => this.apiService.getAllTodos().pipe(
      map(todos => ({type: '[API] Todos Loaded Success', payload: todos})),
      catchError(() => EMPTY)
    ))
  ));

  addTodo = createEffect(() => this.actions$.pipe(
    ofType('[Todos Page] Add Todo'),
    mergeMap((payload) => this.apiService.addTodo(payload['name']).pipe(
      map(todos => ({type: '[API] Todos Added Success', payload: todos})),
      catchError(() => EMPTY)
    ))
  ));

  removeTodo = createEffect(() => this.actions$.pipe(
    ofType('[Todos Page] Remove Todo'),
    mergeMap((payload) => this.apiService.removeTodo(payload['todo']).pipe(
      map(todo => ({type: '[API] Todos Removed Success', payload: payload['todo']})),
      catchError(() => EMPTY)
    ))
  ));

  updateState = createEffect(() => this.actions$.pipe(
    ofType('[Todos Page] Update Todo State'),
    mergeMap((payload) => this.apiService.updateTodoState(payload['todo'], payload['checked']).pipe(
      map(todo => ({type: '[API] Todos Updated Success', payload: payload['todo'], todo})),
      catchError(() => EMPTY)
    ))
  ));

  updateName = createEffect(() => this.actions$.pipe(
    ofType('[Todos Page] Update Todo Name'),
    mergeMap((payload) => this.apiService.updateTodoName(payload['todo'], payload['name']).pipe(
      map(todo => ({type: '[API] Todos Updated Success', payload: payload['todo'], todo})),
      catchError(() => EMPTY)
    ))
  ));
}
