import styles from "./index.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

const ModalPut = ({ onClose }) => {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Work");
  const [todoData, setTodoData] = useState([]);
  const router = useRouter();

  const todoId = getCookie("TodoID");

  useEffect(() => {
    fetch(`/api/todos/${todoId}`)
      .then((res) => res.json())
      .then((data) => {
        setTodoData(data.data);
        setContent(data.data.todo_content);
        setDate(new Date(data.data.todo_date));
        setTime(new Date(data.data.todo_time));
        setCategory(data.data.categories);
      });
  }, []);

  const categories = ["Lavoro", "Personale", "Casa"];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const updatedTodoData = {
      todo_content: content,
      todo_date: date,
      todo_time: time,
      categories: category,
    };

    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodoData),
      });
      if (!response.ok) {
        throw new Error("Network Response was not ok!");
      }
      onClose();
      router.reload("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <button className={styles.close_button} onClick={onClose}>
            ❌
          </button>
          <form onSubmit={handleOnSubmit}>
            <textarea
              rows="2"
              value={content}
              type="text"
              placeholder={todoData.todo_content}
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
            <input type="submit" value="Edit todo!" className={styles.button} />
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalPut;
