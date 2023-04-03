import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import EditTodoForm from "./EditTodoForm";

const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/`;

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({
    id: null,
    fields: {
      Title: "",
    },
  });

  const fetchTodos = () => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          const message = `Error: ${response.status}`;
          throw new Error(message);
        }

        return response.json();
      })
      .then((result) => {
        setTodoList(result.records);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = (newTodo) => {
    const airtableData = {
      fields: {
        Title: newTodo,
      },
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
      body: JSON.stringify(airtableData),
    })
      .then(() => fetchTodos())
      .catch((error) => {
        console.error(error);
      });
  };

  const editTodo = (todo) => {
    setEditing(true);
    setCurrentTodo({
      id: todo.id,
      fields: {
        Title: todo.fields.Title,
      },
    });
  };

  const updateTodo = (id, currentTodo) => {
    setEditing(false);

    fetch(url + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
      body: JSON.stringify({
        fields: {
          Title: currentTodo.fields.Title,
        },
      }),
    })
      .then(() => fetchTodos())
      .catch((error) => {
        console.error(error);
      });
  };

  const removeTodo = (id) => {
    fetch(url + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    })
      .then(() => fetchTodos())
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h1>Todo List</h1>
      {editing ? (
        <EditTodoForm
          setEditing={setEditing}
          currentTodo={currentTodo}
          updateTodo={updateTodo}
        />
      ) : (
        <AddTodoForm onAddTodo={addTodo} />
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList
          todoList={todoList}
          editTodo={editTodo}
          onRemoveTodo={removeTodo}
        />
      )}
    </>
  );
};

export default App;
