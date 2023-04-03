import React, { useState, useEffect } from "react";
import InputWithLabel from "./InputWithLabel";

const EditTodoForm = ({ setEditing, currentTodo, updateTodo }) => {
  const [todo, setTodo] = useState(currentTodo);

  const handleTitleChange = (event) => {
    event.preventDefault();

    setTodo({ ...todo, fields: { ...todo.fields, Title: event.target.value } });
  };

  const resetTodo = () => {
    setTodo({});
  };
  const handleUpdateTodo = (event) => {
    event.preventDefault();

    updateTodo(todo.id, todo);

    resetTodo();
    setEditing(false);
  };

  useEffect(() => {
    setTodo(currentTodo);
  }, [currentTodo]);

  return (
    <form id="todoForm" onSubmit={handleUpdateTodo}>
      <InputWithLabel
        todoTitle={todo.fields.Title}
        handleTitleChange={handleTitleChange}
      >
        Title:
      </InputWithLabel>
      &nbsp;
      <button type="submit">Update</button>
    </form>
  );
};

export default EditTodoForm;
