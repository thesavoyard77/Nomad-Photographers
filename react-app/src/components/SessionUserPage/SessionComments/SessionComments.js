import { useSelector } from "react-redux";

export default function Comments ({ photo }) {

    const sessionUser = useSelector((state) => state.session?.user);
    const commentsArr = photo?.comments
    const photo_id = photo?.id

    const rotateComments = (index) => {

        if (index % 2 === 0) {
            return (
                <div className='even-comment-div'key={commentsArr[index]?.id} >
                    <h5 className="even-comments-username">{commentsArr[index]?.user_name?.username.split("")[0].toUpperCase() + commentsArr[index]?.user_name?.username.slice(1)}</h5>
                    <p className="even-comment-body"><b>{commentsArr[index]?.body}</b></p>
                </div>
            )
        } else {
            return (
                <div className='odd-comment-div'key={commentsArr[index]?.id} >
                    <h5 className="odd-comments-username">{commentsArr[index]?.user_name?.username.split("")[0].toUpperCase() + commentsArr[index]?.user_name?.username.slice(1)}</h5>
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

