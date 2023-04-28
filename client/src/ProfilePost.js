import { useContext, useState } from 'react';
import { UserContext } from './context/user';


function ProfilePost({content, date, likes, id, handlePostDelete, handlePostPatch}) {
    const [formContent, setFormContent] = useState("")
    const [visiblity, setVisibility] = useState(false)
    const {refreshUser} = useContext(UserContext)

    const handleDelete = () => {
        handlePostDelete(id)
        refreshUser()
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
            .then(handlePostPatch)
            .then(refreshUser)

    }

    const toggleVisbility = () => {
        setVisibility(!visiblity)
    }

    return(
        <div id={id}>
            <p>{content}</p>
            <h6>{date}</h6>
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
        </div>
    )

}

export default ProfilePost