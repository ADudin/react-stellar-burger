import styles from "./modal-overlay.module.css";

function ModalOverlay() {

  return (
    <div className={`${styles.overlay} ${styles.overlay__active}`}></div>
  );
}

export default ModalOverlay;