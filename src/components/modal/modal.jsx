import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import { useEffect } from "react";

import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById('modal-root');

function Modal(props) {
  const {modalActive, closeModal} = props;

  useEffect(() => {

    const handleEscClose = (evt) => {
      if (modalActive && evt.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }

  }, [modalActive, closeModal]);

  const handleOverlayClickClose = (evt) => {
    if (modalActive && evt.target.dataset.element === 'overlay') {
      closeModal();
    }
  }

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay modalActive={modalActive} />
        <section onClick={handleOverlayClickClose} data-element="overlay" className={modalActive ? `${styles.modal} ${styles.modal__active}` : styles.modal}>
          <div className={styles.modal__container}>
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

export default Modal;