import { useContext, useState } from 'react';
import { UserContext } from './context/user';


function ProfilePost({content, date, id, likes, handlePostDelete, handlePostPatch}) {
    const [formContent, setFormContent] = useState("")
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
        <div id={id} className='post'>
            <p>{content}</p>
            <p>Likes: {likes.length}</p>
            <button onClick={toggleVisbility}>Edit</button>
            {visiblity ? 
                <form onSubmit={handleSubmit}>
                    <label>Edit Post!</label>
                    <textarea
                        rows='4'
                        type='text'
                        id='content'
                        name='content'
                        onChange={(e) => setFormContent(e.target.value)}
                    />
                    <button>Submit</button>
                </form>
                :
                ""
            }
            <button onClick={handleDelete}>Delete</button>
            <h6>{date}</h6>
        </div>
    )

}

export default ProfilePost