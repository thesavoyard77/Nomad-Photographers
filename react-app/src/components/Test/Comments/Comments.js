import { useSelector } from "react-redux";

export default function Comments ({ photo }) {

    const sessionUser = useSelector((state) => state.session?.user);
    const commentsArr = photo?.comments
    const photo_id = photo?.id
    return (
        <>
            {commentsArr?.map((comment) => (
            <div className='comment-div' key={comment?.id}>
                <hr className="comments-hr"></hr>
                <h3 className="comments-username">{comment?.user_name?.username.split("")[0].toUpperCase() + comment?.user_name?.username.slice(1)}</h3>
                <p className="comment-body"><b>{comment?.body}</b></p>
            </div>
        ))}
        </>
    )
}