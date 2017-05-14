import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleTodo, fetchTodos } from '../actions';
import TodoList from './TodoList';
import { getVisibleTodos } from '../reducers';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.filter !== prevProps.filter){
      this.fetchData();
    }
  }
  fetchData() {
    const { filter } = this.props;
    this.props.fetchTodos(filter);
  }
  render() {
    return <TodoList {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(
      state,
      ownProps.filter
    ),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
    fetchTodos: (filter) => {
      return dispatch(fetchTodos(filter));
    }
  };
};

VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList);

export default VisibleTodoList;
