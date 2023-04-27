import { useContext } from 'react';
import { UserContext } from './context/user';

function MyAccount() {
    const {user} = useContext(UserContext)

    return(
        <div>
            <h1>Account Page</h1>
            <img src={user?.image} alt="profile pic" />
            <h2>Username: {user?.username}</h2>
            <p>Account Created: {user?.created_at}</p>
        </div>
    )


}

export default MyAccount