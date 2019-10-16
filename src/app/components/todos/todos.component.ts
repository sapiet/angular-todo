import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  @ViewChild('editedTodoInput', {static: false}) editedTodoInput: ElementRef;
  public requesting: boolean;
  public todos = [];
  public filter = 'all';
  public allComplete;
  public editingTodo;
  private editedTodo = '';

  public filters = {
    all: {
      code: 'all', label: 'All', filter: todos => todos
    },
    active: {
      code: 'active', label: 'Active', filter: todos => todos.filter(todo => false === todo.completed)
    },
    completed: {
      code: 'completed', label: 'Completed', filter: todos => todos.filter(todo => true === todo.completed)
    }
  };

  constructor(
    private store: Store<{todos: any}>
  ) {
    const hash = window.location.hash.substr(1);

    if (this.filterExists(hash)) {
      this.filter = hash;
    }
  }

  public ngOnInit() {
    this.store.dispatch({type: '[Todos Page] Load Todos'});

    this.store.subscribe(state => {
      this.requesting = state.todos.requesting;

      if (state.todos.todos['hydra:member']) {
        this.todos = state.todos.todos['hydra:member'];
        this.allComplete = this.todos.length === this.filters.completed.filter(this.todos).length;
      }
    });
  }

  public addTodo(event) {
    this.store.dispatch({type: '[Todos Page] Add Todo', name: event.target.value});
    event.target.value = '';
  }

  public removeTodo(todo) {
    this.store.dispatch({type: '[Todos Page] Remove Todo', todo});
  }

  public onStateChange(event, todo) {
    this.store.dispatch({type: '[Todos Page] Update Todo State', todo, checked: event.target.checked});
  }

  public getFilterIndexes() {
    return Object.keys(this.filters);
  }

  public filterExists(filter: string) {
    return this.getFilterIndexes().indexOf(filter) >= 0;
  }

  public applyFilter(event, index) {
    event.preventDefault();
    if (this.filterExists(index)) {
      this.filter = index;
      window.location.hash = index;
    }
  }

  public filteredTodos() {
    return this.filters[this.filter].filter(this.todos);
  }

  public activeCount() {
    return this.filters.active.filter(this.todos).length;
  }

  public removeCompleted() {
    this.filters.completed.filter(this.todos).forEach(
      todo => this.store.dispatch({type: '[Todos Page] Remove Todo', todo})
    );
  }

  public startEditing(todo) {
    this.editedTodo = todo.name;
    this.editingTodo = todo;

    setTimeout(() => {
      this.editedTodoInput.nativeElement.focus();
      this.editedTodoInput.nativeElement.select();
    }, 0);
  }

  public cancelEditing() {
    this.editedTodo = '';
    this.editingTodo = null;
  }

  stopEditing() {
    this.store.dispatch({type: '[Todos Page] Update Todo Name', todo: this.editingTodo, name: this.editedTodo});
    this.cancelEditing();
  }

  onAllCompleteChange(event) {
    this.todos.forEach(todo => {
      if (todo.completed !== event.target.checked) {
        this.store.dispatch({type: '[Todos Page] Update Todo State', todo, checked: event.target.checked});
      }
    });
  }
}
