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



return (
    <>
        <button className="comment-modal-button" onClick={() => setModalIsOpen(true)}>...See Comments</button>
        <Modal isOpen={modalIsOpen}
            style={{
                overlay: {
                    position: 'absolute',
                    top: 550,
                    left: -725,
                    right: 675,
                    bottom: -500,
                    backgroundColor: 'rgba(1, 1, 1, 0.750.33)'
                },
                content: {
                    position: 'absolute',
                    top: '15%',
                    left: '55%',
                    right: '10%',
                    bottom: '5%',
                    border: '5px solid #BBA084',
                    background: '#fff',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '6px',
                    outline: 'none',
                    padding: '20px',
                    backgroundColor: '#F5F5F5',
                    zIndex: 2,
                    }
                
            }}
        >   
        <div className="modal-parent">
            <button  id="close-modal-session" onClick={() => setModalIsOpen(false)}>Close Window</button>
        </div>
        <AddCommentForm photo_id={photo_id} />
        {commentsArr?.map((comment) => (
            
            <div className='comment-div' key={comment?.id}>
                <hr className="comments-hr"></hr>
                <h3 className="comments-username">{comment?.user_name?.username.split("")[0].toUpperCase() + comment?.user_name?.username.slice(1)}</h3>
                <p className="comment-body"><b>{comment?.body}</b></p>
                {sessionUser && sessionUser.id === comment.user_id && <EditCommentForm comment={comment} photo_id={photo_id} />}
                <hr className="comments-hr" ></hr>
            </div>
        ))}
        
         </Modal>
    </>
)

}