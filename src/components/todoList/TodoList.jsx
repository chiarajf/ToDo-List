import styles from "./index.module.scss";
import Todo from "../todo";
import { useState, useEffect } from "react";

const TodoList = () => {
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    fetch("api/todos")
      .then((res) => res.json())
      .then((data) => setTodoData(data.data));
  }, []);

  return (
    <div className={styles.wrapper}>
      {todoData.map((data, index) => (
        <Todo key={index} todoData={data} />
      ))}
    </div>
  );
};

export default TodoList;
