import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../utils/types";

const Todolist = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Function;
}) => {
  useEffect(() => {
    fetch("http://localhost:4000/v1/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todolist);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col mx-auto">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </div>
  );
};

export default Todolist;
