import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
  {
    id: 1,
    title: "Getting started creating a React app",
  },
  {
    id: 2,
    title: "Understanding React components",
  },
  {
    id: 3,
    title: "Using JSX in React",
  },
];

const TodoList = () => (
  <ul>
    {todoList.map((todo) => (
      <TodoListItem key={todo.id} todo={todo} />
    ))}
  </ul>
);

export default TodoList;
