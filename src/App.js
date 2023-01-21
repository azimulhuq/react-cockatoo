import React from "react";

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

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((list) => (
          <li key={list.id}>{list.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
