import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  const fetchTodos = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      });

      if (!response.ok) {
        const message = `Error has ocurred in fetching data: ${response.status}`;
        throw new Error(message);
      }

      const result = await response.json();

      setTodoList(result.records);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (newTodo) => {
    try {
      const airtableData = {
        fields: {
          Title: newTodo,
        },
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
        body: JSON.stringify(airtableData),
      });

      if (!response.ok) {
        const message = `Error has ocurred in adding data: ${response.status}`;
        throw new Error(message);
      }

      // eslint-disable-next-line no-unused-vars
      const result = await response.json();

      fetchTodos();
    } catch (error) {
      console.error(error);
    }
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

  const updateTodo = async (id, currentTodo) => {
    try {
      setEditing(false);

      const response = await fetch(url + id, {
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
      });

      if (!response.ok) {
        const message = `Error has ocurred in updating data: ${response.status}`;
        throw new Error(message);
      }

      // eslint-disable-next-line no-unused-vars
      const result = await response.json();

      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const removeTodo = async (id) => {
    try {
      const response = await fetch(url + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      });

      if (!response.ok) {
        const message = `Error has ocurred in removing data: ${response.status}`;
        throw new Error(message);
      }

      // eslint-disable-next-line no-unused-vars
      const result = await response.json();

      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
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
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
