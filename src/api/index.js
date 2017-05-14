import { generateId } from '../utils/helpers';
import { firebaseDb } from './firebase/index';

const path_todos = "/todos";
var initialized = false;
var todos_list = [];

firebaseDb.ref(path_todos).on('child_added', todo => {
  var itemVal = todo.val();
  itemVal.id = todo.key;
  todos_list.push(itemVal);
});

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

const filterTodos = (todos, filter, resolve) => {
  switch (filter) {
    case "all":
      resolve(todos);
      break;
    case "active":
      resolve(todos.filter(t => !t.completed));
      break;
    case "completed":
      resolve(todos.filter(t => t.completed));
      break;
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
}

export const fetchTodos = (filter) =>

  new Promise(resolve => {
    if (!initialized) {
      firebaseDb.ref(path_todos).once("value").then(function (todos) {
        for (var i = 0; i < todos.length; i++) {
          var itemVal = todos[i].val();
          itemVal.id = todos[i].key;
          todos_list.push(itemVal);
        }
        filterTodos(todos_list, filter, resolve);
        initialized = true;
      });

    }
    else {
      filterTodos(todos_list, filter, resolve);
    }
  });


export const addTodo = (text) =>

  new Promise((resolve, reject) => {

    const todo = {
      text,
      completed: false,
    };

    firebaseDb.ref(path_todos)
      .push(todo, error => error ? reject(error.message) : resolve(todo));

  });


export const toggleTodo = (id) =>
  new Promise((resolve, reject) => {
    const todo = todos_list.find(t => t.id === id);
    todo.completed = !todo.completed;

    firebaseDb.ref(path_todos + "/" + id).update({ completed: todo.completed }).then((err) => {
      if (err)
        reject(err.message);
      else
        resolve(todo);
    });
  });

