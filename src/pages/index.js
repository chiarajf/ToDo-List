import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import AddTodo from "@/components/addTodo";
import TodoList from "@/components/todoList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo List - Esercitazione</title>
        <meta name="description" content="Todo List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <AddTodo />
        <TodoList />
      </main>
    </>
  );
}
