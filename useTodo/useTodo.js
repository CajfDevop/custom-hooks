import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

const initialState = [];

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodo = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: 'add Todo',
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: 'delete Todo',
      payload: id,
    });
  };

  const handleToogleTodo = (id) => {
    dispatch({
      type: 'toggle Todo',
      payload: id,

    })
  }

  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToogleTodo,
    countTodos: todos.length,
    countPendingTodos: todos.filter((todo) => !todo.done).length,
  };
};
