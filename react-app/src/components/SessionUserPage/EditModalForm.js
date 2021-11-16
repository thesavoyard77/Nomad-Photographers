import Modal from "react-modal";
import { useState } from "react";
import EditPhotoForm from "./EditPhotoForm";
import '../Explore/Carousels.css'

export default function ModalCapture({ photo }) {
    const [ modalIsOpen, setModalIsOpen ] = useState(false)


return (
    <>
        <button className="edit-modal-button" onClick={() => setModalIsOpen(true)}>...Edit Photo</button>
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
       <EditPhotoForm photo={photo}/> 
        <button className="modal-button" onClick={() => setModalIsOpen(false)}>Close</button>
         </Modal>
    </>
)

}