import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList, editTodo, onRemoveTodo }) => (
  <ul>
    {todoList.map((todo) => (
      <TodoListItem
        key={todo.id}
        todo={todo}
        editTodo={editTodo}
        onRemoveTodo={onRemoveTodo}
      />
    ))}
  </ul>
);

export default TodoList;
