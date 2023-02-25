import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList, onRemoveTodo }) => (
  <ul>
    {todoList.map(({ id, title }) => (
      <TodoListItem
        key={id}
        id={id}
        title={title}
        onRemoveTodo={onRemoveTodo}
      />
    ))}
  </ul>
);

export default TodoList;
