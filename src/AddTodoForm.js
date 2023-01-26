import React from "react";

const AddTodoForm = (props) => {
  const handleAddTodo = (event) => {
    event.preventDefault();

    let todoTitle = event.target.title.value;
    console.log(todoTitle);
    props.onAddTodo(todoTitle);

    event.target.reset();

    /**
     * Here event.target refers to the HTML Form Element;
     * Form control elements can be accessed by the value specified in their respective name attributes.
     * Form control elements can also be accessed by their indexes based on their order in the form.
     * document.querySelector("#todoTitle").value;
     * document.querySelector("#todoForm").reset();
     */
  };

  return (
    <form id="todoForm" onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input id="todoTitle" type="text" name="title" />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
