import styles from './modal.css'
import { useState } from 'react'

// pass in dimensions and info
// 1) item form
// 2) confirm item delete

const Modal = (props) => {

    const { onCloseModal, height, width } = props;

    return (
        <div className={styles.modal__overlay}>

            <div className="modal">
                {/* HEADER AND CONSTANT MODAL ELEMENTS */}
                <span className="modal__close" onClick={onCloseModal}>&#10005;</span>
                {window.innerWidth <= 480 ? <h3>{titleMap[activeTab][1]}</h3> : <h3>{titleMap[activeTab][0]}</h3>}

                {/* CHANGING MODAL ELEMENTS */}
                <div className="action-container">
                    {activeTab === 'form' ? <AddJobForm /> : <></>}
                    {activeTab === 'scraper' ? <LinkScraper /> : <></>}
                    {activeTab === 'importer' ? <ImportFile /> : <></>}
                </div>
            </div>
        </div>

    )
}

export default Modal