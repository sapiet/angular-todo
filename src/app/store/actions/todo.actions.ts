import { createAction, props } from '@ngrx/store';

export const load = createAction(
  '[Todos Page] Load Todos'
);

export const set = createAction(
  '[API] Todos Loaded Success'
);

export const add = createAction(
  '[Todos Page] Add Todo',
  props<{ title: string }>()
);

export const postAdd = createAction(
  '[API] Todos Added Success'
);

export const remove = createAction(
  '[Todos Page] Remove Todo'
);

export const postRemove = createAction(
  '[API] Todos Removed Success'
);

export const updateState = createAction(
  '[Todos Page] Update Todo State',
  props<{checked: boolean}>()
);

export const postUpdate = createAction(
  '[API] Todos Updated Success'
);

export const updateName = createAction(
  '[Todos Page] Update Todo Name'
);

export const startRequesting = createAction('[Interceptor] Start Requesting');
export const stopRequesting = createAction('[Interceptor] Stop Requesting');
