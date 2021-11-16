import Modal from "react-modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditCommentForm from "./SessionEditCommentForm";
import AddCommentForm from "./SessionAddCommentform";
import '../Explore/Carousels.css'

export default function CommentsModal({ photo }) {
    const sessionUser = useSelector((state) => state.session?.user);
    const [ modalIsOpen, setModalIsOpen ] = useState(false)
    const commentsArr = photo?.comments
    const photo_id = photo?.id

    // console.log(photo)

return (
    <>
        <button className="comment-modal-button" onClick={() => setModalIsOpen(true)}>...See Comments</button>
        <Modal isOpen={modalIsOpen} >
        <button className="modal-button" onClick={() => setModalIsOpen(false)}>Close</button>
        <AddCommentForm photo_id={photo_id} />
        {commentsArr?.map((comment) => (
            
            <div className='comment-div' key={comment?.id}>
                <hr className="comments-hr"></hr>
                <h3 className="comments-username">{comment?.user_name?.username.split("")[0].toUpperCase() + comment?.user_name?.username.slice(1)}</h3>
                <p className="comment-body">{comment?.body}</p>
                {sessionUser && sessionUser.id === comment.user_id && <EditCommentForm comment={comment} photo_id={photo_id} />}
                <hr className="comments-hr" ></hr>
            </div>
        ))}
        
         </Modal>
    </>
)

}