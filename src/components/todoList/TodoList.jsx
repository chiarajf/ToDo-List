import styles from "./index.module.scss";
import Todo from "../todo";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const TodoList = ({ data }) => {
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    fetch("api/todos")
      .then((res) => res.json())
      .then((data) => setTodoData(data.data));
  }, []);

  let filteredTodos = todoData;
  if (data) {
    const selectedDate = format(new Date(data), "yyyy-MM-dd");
    filteredTodos = todoData.filter(
      (todo) => format(new Date(todo.todo_date), "yyyy-MM-dd") === selectedDate
    );
  }

  return (
    <div className={styles.wrapper}>
      {filteredTodos.map((data, index) => (
        <Todo key={index} todoData={data} />
      ))}
    </div>
  );
};

export default TodoList;
