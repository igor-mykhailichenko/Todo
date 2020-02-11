import {
  ADD_TODO,
  REMOVE_TODO,
  DONE_TODO,
  SHOW_FILTER,
  SELECT_ALL,
  DELETE_ALL
} from "./ActionTypes";

export const addTodo = todo => ({
  type: ADD_TODO,
  todo
});

export const removeTodo = id => ({
  type: REMOVE_TODO,
  id
});

export const doneTodo = (id, checked) => ({
  type: DONE_TODO,
  id,
  checked
});

export const showData = filter => ({
  type: SHOW_FILTER,
  filter
});

export const selectAll = () => ({
  type: SELECT_ALL
});

export const deleteAll = () => ({
  type: DELETE_ALL
});