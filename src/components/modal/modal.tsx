import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import { useEffect, FC, BaseSyntheticEvent, ReactNode } from "react";

import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModal {
  closeModal: () => void;
  children?: ReactNode;
};

const modalRoot = document.getElementById('modal-root') as HTMLElement;

const Modal: FC<IModal> = ({ closeModal, children }) => {

  useEffect(() => {

    const handleEscClose = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [closeModal]);

  const handleOverlayClickClose = (evt: BaseSyntheticEvent) => {
    if (evt.target.dataset.element === 'overlay') {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay />
        <section onClick={handleOverlayClickClose} data-element="overlay" className={`${styles.modal} ${styles.modal__active}`}>  
          <div className={styles.modal__container}>
            {children}
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