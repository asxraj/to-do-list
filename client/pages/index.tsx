import type { NextPage } from "next";
import Head from "next/head";
import Todolist from "../components/Todolist";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-start  bg-gradient-to-r from-green-500 to-green-700 min-h-screen">
      <Head>
        <title>Todolist</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex gap-6 justify-center my-10">
        <div className="">
          <label htmlFor="todo" className="justfy-center">
            Todo
          </label>
        </div>
        <input
          name="todo"
          type="text"
          className="rounded-md w-[300px] py-1 active:border-none"
        />
      </div>
      <div className="flex justify-center">
        <Todolist />
      </div>
    </div>
  );
};

export default Home;
