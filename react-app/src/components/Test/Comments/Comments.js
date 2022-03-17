import { useSelector } from "react-redux";

export default function Comments ({ photo }) {

    const sessionUser = useSelector((state) => state.session?.user);
    const commentsArr = photo?.comments
    const photo_id = photo?.id

    const rotateComments = (index) => {

        if (index % 2 === 0) {
            return (
                <div className='even-comment-div'key={commentsArr[index]?.id} >
                    <hr className="even-comments-hr"></hr>
                    <h3 className="even-comments-username">{commentsArr[index]?.user_name?.username.split("")[0].toUpperCase() + commentsArr[index]?.user_name?.username.slice(1)}</h3>
                    <p className="even-comment-body"><b>{commentsArr[index]?.body}</b></p>
                </div>
            )
        } else {
            return (
                <div className='odd-comment-div'key={commentsArr[index]?.id} >
                    <hr className="odd-comments-hr"></hr>
                    <h3 className="odd-comments-username">{commentsArr[index]?.user_name?.username.split("")[0].toUpperCase() + commentsArr[index]?.user_name?.username.slice(1)}</h3>
                    <p className="odd-comment-body"><b>{commentsArr[index]?.body}</b></p>
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

