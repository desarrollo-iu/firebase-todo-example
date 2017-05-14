import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';

const App = ({ match }) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>React Todos</h2>
    </div>
    <div className="Todo-App">
      <AddTodo />
      <VisibleTodoList filter={match.params.filter || 'all'}/>
      <Footer />
    </div>
  </div>
);

export default App;
