import styles from "./modal-overlay.module.css";
import propTypes from "prop-types";

function ModalOverlay(props) {
  return (
    <div className={props.modalActive ? `${styles.overlay} ${styles.overlay__active}` : styles.overlay}></div>
  );
}

ModalOverlay.propTypes = {
  modalActive: propTypes.bool.isRequired
}

export default ModalOverlay;