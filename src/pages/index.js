import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import AddTodo from "@/components/addTodo";
import TodoList from "@/components/todoList";
import User from "@/components/user";
import { useState } from "react";
import Calendar from "@/components/calendar";

export default function Home() {
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };
  return (
    <>
      <Head>
        <title>Todo List - Esercitazione</title>
        <meta name="description" content="Todo List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <User />
        <Calendar showDetailsHandle={showDetailsHandle} />
        <br />
        {showDetails}
        <TodoList data={data} />
        <AddTodo />
      </main>
    </>
  );
}
