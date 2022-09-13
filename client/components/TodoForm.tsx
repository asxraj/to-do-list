import React, { useState, useEffect } from "react";
import { Todo } from "../utils/types";

const TodoForm = ({ todos, setTodos }: { todos: Todo[]; setTodos: any }) => {
  const [input, setInput] = useState<string>("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    const data = { task: input };

    fetch("http://localhost:4000/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          let err = new Error("Invalid response code: " + response.status);
        }

        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setInput("");
        return fetch("http://localhost:4000/v1/todos");
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setTodos(data.todolist);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center mt-20 mb-10">
      <div className=""></div>
      <input
        name="todo"
        type="text"
        placeholder="To-do..."
        value={input}
        className="rounded-l-lg w-[400px] py-5 px-5 active:border-none focus:outline-none focus:placeholder:text-transparent"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 py-3 px-9 rounded-r-lg"
        onClick={submitHandler}
      >
        Add
      </button>
    </div>
  );
};

export default TodoForm;
