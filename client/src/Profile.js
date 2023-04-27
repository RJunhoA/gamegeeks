import { useContext } from 'react';
import { UserContext } from './context/user';
import ProfilePost from './ProfilePost';




function Profile() {
    const {user} = useContext(UserContext)
    const post = user.posts.map((p) => {
        return (
            <ProfilePost 
                key={p.id}
                content={p.content}
                date={p.created_at}
                likes={p.likes}

            />
        )
    })



    return(
        <div>
            <img src={user.image} alt='profile pic' />
            <h1>{user.username}</h1>
            <div>
                {post}
            </div>
        </div>
    )
}

export default Profile