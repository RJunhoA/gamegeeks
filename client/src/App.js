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

    const addPostState = (newPostObj) => {
        setPosts([...posts, newPostObj])
    }

    return(
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={user ? <h2>Welcome back {user?.username}!</h2> : <h2>Welcome to Game Geeks!</h2>} />
                <Route path='/profile' element={user ? <Profile posts={posts} addPostState={addPostState} /> : <Navigate to='/login' />} />
                <Route path='/gamers' element={<GamersContainer gamers={gamers} />} />
                <Route path='/feed' element={<FeedContainer posts={posts} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/account' element={user ? <MyAccount/> : <Navigate to='/login' />} />
                <Route path='/signup' element={<Signup addGamerState={addGamerState} />} />
            </Routes>
        </div>
    )
}

export default App;
