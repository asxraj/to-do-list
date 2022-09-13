import React from "react";
import { Todo } from "../utils/types";
import { AiFillEdit } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";

const TodoItem = ({ todo, setTodos }: { todo: Todo; setTodos: any }) => {
  const deleteHandler = () => {
    fetch(`http://localhost:4000/v1/todo/${todo.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          console.log("something went wrong");
          let err = new Error("something went wrong: " + response.status);
        }

        console.log(
          "everytinh went ok, check out this response object",
          response
        );
        return response.json();
      })
      .then((data) => {
        console.log(data);

        return fetch("http://localhost:4000/v1/todos");
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setTodos(data.todolist);
      })
      .catch((err) => console.log(err));
    console.log("Deleted the item of id:", todo.id);
  };

  return (
    <div className="flex justify-between py-4 px-5 rounded-md w-[450px] bg-white mt-3 shadow-lg">
      <p className="cursor-pointer">{todo.task}</p>
      <div className="flex gap-2">
        <AiFillEdit className="w-5 h-5 cursor-pointer text-gray-300 hover:text-gray-500" />
        <FiDelete
          onClick={deleteHandler}
          className="w-5 h-5 cursor-pointer text-red-400 hover:text-red-600"
        />
      </div>
    </div>
  );
};

export default TodoItem;
