import styles from './modal.css'
import { useState } from 'react'

// pass in dimensions and info
// 1) item form
// 2) confirm item delete

const Modal = (props) => {

    const { onCloseModal, height, width } = props;

    return (
        <div className={styles.modal-overlay}>

            <div className="tab-container">
                <div className={activeTab === "form" ? "active modal-tab" : "modal-tab"} onClick={() => setActiveTab('form')}>
                    <div className='modal-tab__overline'></div>
                    <p className='modal-tab__text'>Add Manually</p>
                </div>
                <div className={activeTab === "scraper" ? "active modal-tab" : "modal-tab"} onClick={() => setActiveTab('scraper')}>
                    <div className='modal-tab__overline'></div>
                    <p className='modal-tab__text'>Populate from URL</p>
                </div>
                <div className={activeTab === "importer" ? "active modal-tab" : "modal-tab"} onClick={() => setActiveTab('importer')}>
                    <div className='modal-tab__overline'></div>
                    <p className='modal-tab__text'>Import from CSV</p>
                </div>
            </div>

            <div className="modal">
                {/* HEADER AND CONSTANT MODAL ELEMENTS */}
                <span className="modal-close" onClick={onCloseModal}>&#10005;</span>
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