import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import TodoForm from "../components/TodoForm";
import Todolist from "../components/Todolist";

import { Todo } from "../utils/types";

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className="bg-gradient-to-r from-sky-400 to-blue-500 min-h-screen">
      <div className="flex flex-col justify-center w-[70vw] mx-auto">
        <Head>
          <title>Todolist</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <TodoForm setTodos={setTodos} todos={todos} />

        <Todolist todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};

export default Home;
