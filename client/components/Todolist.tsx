import React, { useState, useEffect } from "react";

const Todolist = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost/v1/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todolist);
      });
  });
  return (
    <>
      {todos.map((todo) => (
        <div>{todo.id}</div>
      ))}
    </>
  );
};

export default Todolist;
