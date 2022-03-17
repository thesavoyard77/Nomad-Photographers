import { useSelector } from "react-redux";

export default function Comments ({ photo }) {

    const sessionUser = useSelector((state) => state.session?.user);
    const commentsArr = photo?.comments
    const photo_id = photo?.id

    const rotateComments = (index) => {
        if (commentsArr.length < 1) return <div className="no-comments"><h3>Be the first to comment</h3></div>
        if (index % 2 === 0) {
            return (
                <div className='comment-div'key={commentsArr[index]?.id} >
                    <hr className="comments-hr"></hr>
                    {console.log(commentsArr[index])}
                    <h3 className="comments-username">{commentsArr[index]?.user_name?.username.split("")[0].toUpperCase() + commentsArr[index]?.user_name?.username.slice(1)}</h3>
                    <p className="comment-body"><b>{commentsArr[index]?.body}</b></p>
                </div>
            )
        } else {
            return (
                <div className='comment-div'key={commentsArr[index]?.id} >
                    <hr className="comments-hr"></hr>
                    {console.log(commentsArr[index])}
                    <h3 className="comments-username">{commentsArr[index]?.user_name?.username.split("")[0].toUpperCase() + commentsArr[index]?.user_name?.username.slice(1)}</h3>
                    <p className="comment-body"><b>{commentsArr[index]?.body}</b></p>
                </div>
            )
        }

    }
    return (
        <>
            {commentsArr?.map((comment) => (
                rotateComments(commentsArr.indexOf(comment))
        ))}
        </>
    )
}

{/* <div className='comment-div' key={comment?.id}>
<hr className="comments-hr"></hr>
<h3 className="comments-username">{comment?.user_name?.username.split("")[0].toUpperCase() + comment?.user_name?.username.slice(1)}</h3>
<p className="comment-body"><b>{comment?.body}</b></p>
</div> */}