import Modal from "react-modal";
import { useState } from "react";
import EditPhotoForm from "./EditPhotoForm";
import '../Explore/Carousels.css'

export default function ModalCapture({ photo }) {
    const [ modalIsOpen, setModalIsOpen ] = useState(false)


return (
    <>
        <button className="edit-modal-button" onClick={() => setModalIsOpen(true)}>...Edit Photo</button>
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
         style={{
            overlay: {
                position: 'fixed',
                top: 100,
                left: 150,
                right: 50,
                bottom: 100,
                backgroundColor: 'rgba(1, 1, 1, 0.750.33)'
            },
            content: {
                position: 'absolute',
                top: '15%',
                left: '55%',
                right: '10%',
                bottom: '20%',
                border: '5px solid #BBA084',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '6px',
                outline: 'none',
                padding: '20px',
                backgroundColor: '#F5F5F5',
              }
            
        }}
        >
       <EditPhotoForm photo={photo}/> 
        {/* <button className="modal-button" onClick={() => setModalIsOpen(false)}>Close</button> */}
         </Modal>
    </>
)

}