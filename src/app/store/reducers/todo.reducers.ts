import { Action, createReducer, on, State } from '@ngrx/store';
import * as TodoActions from '../actions/todo.actions';

export const initialState = {
  requesting: false,
  todos: {}
};

const todosReducerInner = createReducer(initialState,
  on(TodoActions.load, state => state),

  on(TodoActions.set, (state, response) => {
    state.todos = response['payload'];

    return state;
  }),

  on(TodoActions.postAdd, (state, response) => {
    state.todos['hydra:member'].unshift(response['payload']);

    return state;
  }),

  on(TodoActions.postRemove, (state, response) => {
    state.todos['hydra:member'].splice(
      state.todos['hydra:member'].indexOf(response['payload']),
      1
    );

    return state;
  }),

  on(TodoActions.postUpdate, (state, response) => {
    const index = state.todos['hydra:member'].indexOf(response['payload']);
    state.todos['hydra:member'][index] = response['todo'];

    return state;
  }),

  on(TodoActions.startRequesting, state => {
    state.requesting = true;

    return state;
  }),

  on(TodoActions.stopRequesting, state => {
    state.requesting = false;

    return state;
  })
);

export function todosReducer(state, action: Action) {
  return todosReducerInner(state, action);
}
