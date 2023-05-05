import { useContext, useState, useEffect } from 'react';
import { UserContext } from './context/user';


function ProfileLike({content, date, id, likes, handlePostLikesDelete}) {
    const [likeId, setLikeId] = useState(0)
    const {user, deleteUserPost} = useContext(UserContext)
    
    useEffect(() => {
        const userLike = likes.find(like => like.user_id === user?.id)
        if (userLike) {
            setLikeId(userLike.id)
        }
    }, [likes, user?.id]);

    const handleUnlike = () => {
        handlePostLikesDelete(likeId)
        deleteUserPost(id)
        fetch(`/likes/${likeId}`, {
            method: "DELETE"
        })
        .then(r => {
            if (!r.ok) {
                throw new Error("Failed to unlike post")
            }
        })
        .catch(error => {
            console.error(error)
        })
    }

    return(
        <div id={id} className='post'>
            <p>{content}</p>
            <p>Likes: {likes.length}</p>
            <button onClick={handleUnlike}>❤️</button>
            <h6>{date}</h6>
        </div>
    )

}

export default ProfileLike