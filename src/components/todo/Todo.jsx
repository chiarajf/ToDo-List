import styles from "./index.module.scss";

const Todo = ({ todoData }) => {
  return (
    <div className={styles.wrapper}>
      <h3>{todoData.todo_content}</h3>
      <div className={styles.clock}>
        <p>{todoData.todo_date}</p>
        <p>{todoData.todo_time}</p>
      </div>
      <p>{todoData.categories}</p>
    </div>
  );
};

export default Todo;
