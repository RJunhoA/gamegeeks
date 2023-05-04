import React, {useState, useEffect} from 'react';

const UserContext = React.createContext();

function UserProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("/check_session").then(r => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            }
        });
    }, []);

    const sessionCheck = useEffect(() => {
        fetch("/check_session").then(r => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            }
        });
    }, []);

    const addUserPost = (postObj) => {
        const userCopy = {...user}
        userCopy.posts.push(postObj)
        setUser(userCopy)
    }

    const deleteUserPost = (id) => {
        const userCopy = {...user}
        userCopy.posts = userCopy.posts.filter(post => {
            return post.id !== id
        })
        setUser(userCopy)
    }

    const patchUserPost = updatedPost => {
        const userCopy = {...user}
        userCopy.posts = userCopy.posts.map(post => {
            if (post.id === updatedPost.id) {
                return {...updatedPost}
            } else {
                return post
            }
        })
        setUser(userCopy)
    }



    return(
        <UserContext.Provider value={{user, sessionCheck, setUser, deleteUserPost, addUserPost, patchUserPost}}>
            {children}
        </UserContext.Provider>
    )

}

export {UserProvider, UserContext}