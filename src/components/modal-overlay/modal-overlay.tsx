import styles from "./modal-overlay.module.css";
import { FC } from "react";

const ModalOverlay: FC = () => {

  return (
    <div className={`${styles.overlay} ${styles.overlay__active}`}></div>
  );
}

export default ModalOverlay;