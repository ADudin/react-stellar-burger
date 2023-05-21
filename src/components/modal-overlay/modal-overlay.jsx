import styles from "./modal-overlay.module.css";

function ModalOverlay(props) {
  return (
    <div className={props.modalActive ? `${styles.overlay} ${styles.overlay__active}` : styles.overlay}></div>
  );
}

export default ModalOverlay;