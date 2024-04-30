import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Image from "next/image";

const User = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const monthNames = [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ];
    const monthIndex = date.getMonth();
    const currentMonth = monthNames[monthIndex];
    const currentYear = date.getFullYear();
    setCurrentDate(`${currentMonth} ${currentYear}`);
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <label>
          <h2>ChiaraJF</h2>
          <p>{currentDate}</p>
        </label>
        <Image
          className={styles.image}
          src="https://robohash.org/Gusylenia?set=set4"
          alt="Chiara"
          width={100}
          height={100}
        />
      </div>
    </>
  );
};

export default User;
