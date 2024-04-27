import styles from "./index.module.scss";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";

const Modal = () => {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const categories = ["Work", "Personal", "Home"];

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
    } catch (error) {}
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleOnSubmit}>
        <input
          value={content}
          type="text"
          placeholder="What you have to do, today?"
          onChange={(e) => setContent(e.target.value)}
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
        <input type="submit" value="Add Todo!" />
      </form>
    </div>
  );
};

export default Modal;
