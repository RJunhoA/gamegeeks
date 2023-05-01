import { useContext, useState } from 'react';
import { UserContext } from './context/user';
import ProfilePost from './ProfilePost';




function Profile({addPostState, handlePostDelete, handlePostPatch}) {
    const [content, setContent] = useState("");
    const {user, addUserPost} = useContext(UserContext);

    const post = user.posts.map((p) => {
        return (
            <ProfilePost 
                key={p.id}
                id={p.id}
                content={p.content}
                date={p.created_at}
                likes={p.likes || []}
                handlePostDelete={handlePostDelete}
                handlePostPatch={handlePostPatch}
            />
        )
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        const contentObj = {
            content: content
        }
        fetch("/posts", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(contentObj)
        })
            .then(r => r.json())
            .then(data => {
                const post_id = data.id
                fetch("/likes", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        user_id: user.id,
                        post_id: post_id 
                    })
                })
                .then(r => r.json())
                .then(data => {
                    addPostState(data)
                    addUserPost(data)
                })
            })
        e.target.reset()
    }

    return(
        <div>
            <img src={user.image} alt='profile pic' />
            <h1>{user.username}</h1>
            <form onSubmit={handleSubmit}>
                <label>Make a Post!</label>
                <textarea
                    rows='4'
                    type='text'
                    id='content'
                    name='content'
                    onChange={(e) => setContent(e.target.value)}
                />
                <button>
                    Submit
                </button>
            </form>
            <div>
                {post}
            </div>
        </div>
    )
}

export default Profile