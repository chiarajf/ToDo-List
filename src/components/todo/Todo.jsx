import styles from "./index.module.scss";

const Todo = ({ todoData }) => {
  const formatTime = (timeString) => {
    const dateObj = new Date(timeString);
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    return `${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""}${minute}`;
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className={styles.wrapper}>
      <h3>{todoData.todo_content}</h3>
      <div className={styles.clock}>
        <p>{formatDate(todoData.todo_date)}</p>
        <p>{formatTime(todoData.todo_time)}</p>
      </div>
      <p>{todoData.categories}</p>
    </div>
  );
};

export default Todo;
