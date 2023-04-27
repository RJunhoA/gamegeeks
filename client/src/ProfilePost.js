// import { useContext } from 'react';
// import { UserContext } from './context/user';


function ProfilePost({content, date, likes, id}) {
    // const {user} = useContext(UserContext)


    return(
        <div id={id}>
            <p>{content}</p>
            <h6>{date}</h6>
        </div>
    )

}

export default ProfilePost