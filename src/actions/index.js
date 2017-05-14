import * as api from '../api';
import { normalize } from 'normalizr';
import * as schema from './schema';

const requestTodos = () => {
  return {
    type: 'REQUEST_TODOS'
  }
}
const receiveTodos = (filter, response) => {
  return {
    type: 'RECEIVE_TODOS',
    filter,
    response
  }
}
export function fetchTodos(filter) {
  return function (dispatch) {
    dispatch(requestTodos())
    return api.fetchTodos(filter)
      .then(todos => {
        dispatch(receiveTodos(filter, normalize(todos, schema.arrayOfTodos)));
      });
  }
}

export const addTodo = (text) => (dispatch) =>
	api.addTodo(text).then(response => {
    dispatch({
			type: 'ADD_TODO_SUCCESS',
			response: normalize(response, schema.todo),
		});
	});

export const toggleTodo = (id) => (dispatch) =>
  api.toggleTodo(id).then(response => {
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response: normalize(response, schema.todo),
    });
  });
