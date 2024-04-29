import { useState } from "react";
import styles from "./index.module.scss";
import Modal from "../modal";

const AddTodo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={styles.button} onClick={handleModalOpen}>
        Add To do
      </button>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </>
  );
};

export default AddTodo;
