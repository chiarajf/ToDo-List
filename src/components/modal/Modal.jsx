import styles from "./index.module.scss";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";

const Modal = ({ onClose }) => {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Lavoro");
  const router = useRouter();

  const categories = ["Lavoro", "Personale", "Casa"];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const todoData = {
      todo_content: content,
      todo_date: date,
      todo_time: time,
      categories: category,
      isInProgress: true,
    };

    try {
      const response = await fetch("api/todos", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(todoData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      onClose();
      router.reload("/");
    } catch (error) {}
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3>Aggiungi Task</h3>
        <button className={styles.close_button} onClick={onClose}>
          ✕
        </button>
        <form onSubmit={handleOnSubmit}>
          <textarea
            rows="1"
            value={content}
            type="text"
            placeholder="Cosa devi fare oggi?"
            onChange={(e) => setContent(e.target.value)}
            className={styles.message}
          />
          <label>
            <DatePicker
              selected={time}
              onChange={(time) => setTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </label>
          <label>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </label>
          <select onChange={(e) => setCategory(e.target.value)}>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input type="submit" value="Aggiungi!" className={styles.button} />
        </form>
      </div>
    </div>
  );
};

export default Modal;
