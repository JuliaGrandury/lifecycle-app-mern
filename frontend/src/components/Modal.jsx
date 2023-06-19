import styles from "./Modal.module.css"
import { useState } from "react"

// pass in dimensions and info
// 1) item form
// 2) confirm item delete

const Modal = (props) => {
  const { onCloseModal } = props

  return (
    <div className={styles.modal__overlay}>
      <div className="modal">
        {/* HEADER AND CONSTANT MODAL ELEMENTS */}
        <h1>This is a modal</h1>
        <span className="modal__close" onClick={onCloseModal}>
          &#10005;
        </span>

      </div>
    </div>
  )
}

export default Modal
