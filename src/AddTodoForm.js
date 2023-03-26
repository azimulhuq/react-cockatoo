import React from "react";
import InputWithLabel from "./InputWithLabel";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = React.useState("");

  const handleTitleChange = (event) => {
    event.preventDefault();

    setTodoTitle(event.target.value);
  };

  const resetTitle = () => {
    setTodoTitle("");
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    onAddTodo(todoTitle);

    resetTitle();
  };

  return (
    <form id="todoForm" onSubmit={handleAddTodo}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
        Title:
      </InputWithLabel>
      &nbsp;
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
