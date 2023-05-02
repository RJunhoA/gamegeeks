import {useState, useEffect} from 'react';
import { useContext } from 'react';
import { UserContext } from './context/user';


function FeedCard({id, content, owner, image, likes, handlePostPatch, handlePostLikesDelete}) {
    const [liked, setLiked] = useState(false);
    const [likeId, setLikeId] = useState(0)
    const {user} = useContext(UserContext);

    useEffect(() => {
        fetch(`posts/${id}`)
            .then(r => r.json())
            .then(data => {
                const likes = data.likes
                const hasLiked = likes.some(like => like.user_id === user?.id)
                setLiked(hasLiked)
                const userLike = likes.find(like => like.user_id === user?.id);
                if (userLike) {
                    setLikeId(userLike?.id)
                }
            })
    }, [id, user.id])

    const handleLike = () => {
        setLiked(true);
        fetch('/likes', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                user_id: user?.id,
                post_id: id
            })
        })
        .then(r => r.json())
        .then(data => {
            const likes = data.likes
            handlePostPatch(data)
            const userLike = likes.find(like => like.user_id === user?.id);
                if (userLike) {
                    setLikeId(userLike?.id)
                }
        })
        // .then(refreshUser)
    }

    const handleUnlike = () => {
        setLiked(false);
        handlePostLikesDelete(likeId)
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
        // .then(refreshPosts)
        // .then(refreshUser)
    }

    return(
        <div id={id}>
            <img src={image} alt="profile pic" />
            <h2>{owner}</h2>
            <p>{content}</p>
            <p>Likes: {likes?.length}</p>
            {liked ? (
                <button onClick={handleUnlike}>❤️</button>
            ) : (
                <button onClick={handleLike}>🤍</button>
            )}
        </div>
    )
}

export default FeedCard