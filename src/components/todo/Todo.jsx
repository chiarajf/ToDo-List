import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import ModalPut from "../modalPut";
import { setCookie } from "cookies-next";

const Todo = ({ todoData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const getCategoryColor = (category) => {
    switch (category) {
      case "Lavoro":
        return "#ff7e89";
      case "Personale":
        return "#ffd166";
      case "Casa":
        return "#048F86";
    }
  };

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

  const handleCompleteTask = async () => {
    const dataToComplete = {
      isInProgress: false,
    };
    try {
      const response = await fetch(`/api/todos/${todoData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToComplete),
      });
      if (!response.ok) {
        throw new Error("Network Response was not ok!");
      }
      router.reload("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`/api/todos/${todoData._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network Response was not ok!");
      }
      router.reload("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setCookie("TodoID", todoData._id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCookie("TodoID", "");
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.close_button} onClick={handleDeleteTask}>
        ✕
      </button>

      <div className={styles.title}>
        <input
          type="checkbox"
          onChange={handleCompleteTask}
          checked={!todoData.isInProgress}
        />
        <h3>{todoData.todo_content}</h3>
      </div>
      <div className={styles.details}>
        <span className={styles.clock}>
          <p>{formatDate(todoData.todo_date)}</p>
          <p>{formatTime(todoData.todo_time)}</p>
        </span>
        <p>
          {todoData.categories}
          <span
            className={styles.category}
            style={{ backgroundColor: getCategoryColor(todoData.categories) }}
          />
        </p>
      </div>
      <button className={styles.edit} onClick={handleModalOpen}>
        ✏️
      </button>
      {isModalOpen && <ModalPut onClose={handleCloseModal} />}
    </div>
  );
};

export default Todo;
