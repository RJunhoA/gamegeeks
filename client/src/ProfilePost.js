import { useContext } from 'react';
import { UserContext } from './context/user';


function ProfilePost({key, content, date, likes}) {
    const {user} = useContext(UserContext)


    return(
        <div key={key}>
            <p>{content}</p>
            <h6>{date}</h6>
        </div>
    )

}

export default ProfilePost