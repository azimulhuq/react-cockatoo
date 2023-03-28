import React from "react";

const TodoListItem = ({ todo, editTodo, onRemoveTodo }) => (
  <li>
    {todo.fields.Title}&nbsp;
    <button type="button" onClick={() => editTodo(todo)}>
      Edit
    </button>
    &nbsp;
    <button type="button" onClick={() => onRemoveTodo(todo.id)}>
      Remove
    </button>
  </li>
);

export default TodoListItem;
