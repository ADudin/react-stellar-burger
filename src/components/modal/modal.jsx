import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import propTypes from "prop-types";

import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById('modal-root');

function Modal(props) {
  const { closeModal } = props;

  useEffect(() => {

    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [closeModal]);

  const handleOverlayClickClose = (evt) => {
    if (evt.target.dataset.element === 'overlay') {
      closeModal();
    }
  }

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay />
        <section onClick={handleOverlayClickClose} data-element="overlay" className={`${styles.modal} ${styles.modal__active}`}>  
          <div className={styles.modal__container}>
            {props.children}
            <button onClick={closeModal} className={styles.modal__close} type="button">
              <CloseIcon type="primary" />
            </button>
          </div>
        </section>
      </>
    ),
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: propTypes.func.isRequired,
  children: propTypes.element.isRequired
}

export default Modal;