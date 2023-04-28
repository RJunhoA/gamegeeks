import { useContext } from 'react';
import { UserContext } from './context/user';


function ProfilePost({content, date, likes, id, handlePostDelete}) {
    const {refreshUser} = useContext(UserContext)
    const handleDelete = () => {
        handlePostDelete(id)
        refreshUser()
        fetch(`/posts/${id}`, {
            method: "DELETE"
        })
    }


    return(
        <div id={id}>
            <p>{content}</p>
            <h6>{date}</h6>
            <button>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )

}

export default ProfilePost