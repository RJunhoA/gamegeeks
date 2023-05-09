import { useContext, useState } from 'react';
import { UserContext } from './context/user';


function ProfilePost({content, date, id, likes, handlePostDelete, handlePostPatch}) {
    const [formContent, setFormContent] = useState(content)
    const [visiblity, setVisibility] = useState(false)
    const {deleteUserPost, patchUserPost} = useContext(UserContext)

    const handleDelete = () => {
        handlePostDelete(id)
        deleteUserPost(id)
        fetch(`/posts/${id}`, {
            method: "DELETE"
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const contentObj = {
            content: formContent
        }
        fetch(`/posts/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(contentObj)
        })
            .then(r => r.json())
            .then(data => {
                handlePostPatch(data)
                patchUserPost(data)
            })
        e.target.reset()

    }

    const toggleVisbility = () => {
        setVisibility(!visiblity)
    }

    return(
        <div id={id} className='post' style={{position: "relative"}}>
            <button style={{position: "absolute", top: 0, right: 0, marginRight: "0.5rem", marginTop: "0.5rem"}} onClick={toggleVisbility}>Edit</button>
            <button style={{position: "absolute", top: 25, right: 0, marginRight: "0.5rem",}} onClick={handleDelete}>Delete</button>
            <p className='profile-post'>{content}</p>
            <p>Likes: {likes.length}</p>
            {visiblity ? 
                <form onSubmit={handleSubmit}>
                    <label>Edit Post!</label>
                    <textarea
                        rows='4'
                        type='text'
                        id='content'
                        name='content'
                        value={formContent}
                        onChange={(e) => setFormContent(e.target.value)}
                    />
                    <button>Submit</button>
                </form>
                :
                ""
            }
            <h6>{date}</h6>
        </div>
    )

}

export default ProfilePost