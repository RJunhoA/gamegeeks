import { useEffect, useState } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';
import Signup from './Signup';
import GamersContainer from './GamersContainer';
import FeedContainer from './FeedContainer';
import MyAccount from './MyAccount';
import Profile from './Profile';
import { useContext } from 'react';
import { UserContext } from './context/user';


function App() {
    const {user} = useContext(UserContext)
    const [gamers, setGamers] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('/users')
            .then(r => r.json())
            .then(setGamers)
    }, [])

    useEffect(() => {
        fetch('/posts')
            .then(r => r.json())
            .then(setPosts)
    }, [])

    const addGamerState = (newGamerObj) => {
        setGamers([newGamerObj, ...gamers])
    }

    const updateGamer = (updatedGamer) => {
        setGamers(gamers.map(gamer => {
            if (gamer.id === updatedGamer.id) {
                return {
                    ...gamer,
                    ...updatedGamer
                }
            } else {
                return gamer
            }
        }))
    }

    const addPostState = (newPostObj) => {
        setPosts((prevPosts) => [newPostObj, ...prevPosts])
    }

    const handlePostDelete = (id) => {
        setPosts(posts.filter(post => {
            return post.id !== id
        }))
    }

    const handlePostPatch = updatedPost => {
        setPosts(posts.map(post => {
            if (post.id === updatedPost.id) {
                return {...updatedPost}
            } else {
                return post
            }
        }))
    }

    const handlePostLikesDelete = (likeId, postId) => {
        const postsCopy = [...posts]
        postsCopy.forEach(post => {
            post.likes = post.likes.filter(like => like.id !== likeId) 
            if (post.id === postId ) {
                post.users = post.users.filter(u => u.id !== user?.id)       
            } else {
                return post.users
            }
        })
        setPosts(postsCopy)
    }

    const updatePostUser = (updatedUser) => {
        const postsCopy = [...posts]
        postsCopy.forEach(post => {
            post.users = post.users.map(user => {
                if (user.id === updatedUser.id) {
                    return updatedUser
                } else {
                    return user
                }
            })
        })
        setPosts(postsCopy)
    }

    return(
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={user ? <h2>Welcome back {user?.username}!</h2> : <h2>Welcome to Game Geeks!</h2>} />
                <Route path='/profile' element={user ? <Profile addPostState={addPostState} handlePostDelete={handlePostDelete} handlePostPatch={handlePostPatch} handlePostLikesDelete={handlePostLikesDelete} /> : <Navigate to='/login' />} />
                <Route path='/gamers' element={<GamersContainer gamers={gamers} />} />
                <Route path='/feed' element={user ? <FeedContainer posts={posts} handlePostPatch={handlePostPatch} handlePostLikesDelete={handlePostLikesDelete}  /> : <Navigate to='/login' />} />
                <Route path='/login' element={<Login />} />
                <Route path='/account' element={user ? <MyAccount updatePostUser={updatePostUser} updateGamer={updateGamer} /> : <Navigate to='/login' />} />
                <Route path='/signup' element={<Signup addGamerState={addGamerState} />} />
            </Routes>
        </div>
    )
}

export default App;
