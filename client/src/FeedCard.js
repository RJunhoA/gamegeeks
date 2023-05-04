import {useState, useEffect} from 'react';
import { useContext } from 'react';
import { UserContext } from './context/user';


function FeedCard({id, content, owner, image, likes, users, handlePostPatch, handlePostLikesDelete}) {
    const [liked, setLiked] = useState(false);
    const [likeId, setLikeId] = useState(0)
    const {user, addUserPost, deleteUserPost} = useContext(UserContext);

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
            addUserPost(data)
            const userLike = likes.find(like => like.user_id === user?.id);
                if (userLike) {
                    setLikeId(userLike?.id)
                }
        })
    }

    const handleUnlike = () => {
        if (user?.id === likes[0].user_id) {
            alert("Cannot unlike your own post!")
        } else {
            setLiked(false);
            handlePostLikesDelete(likeId, id)
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
    }

    return(
        <div id={id}>
            <img src={image} alt="profile pic" />
            <h2>{owner}</h2>
            <p>{content}</p>
            <p>Likes: {likes?.length}</p>
            <p>{users} Liked this post</p>
            {liked ? (
                <button onClick={handleUnlike}>❤️</button>
            ) : (
                <button onClick={handleLike}>🤍</button>
            )}
        </div>
    )
}

export default FeedCard