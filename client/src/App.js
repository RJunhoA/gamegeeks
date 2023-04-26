import { useEffect, useState } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';
import Signup from './Signup';
import GamersContainer from './GamersContainer';
import FeedContainer from './FeedContainer';
import MyAccount from './MyAccount';

function App() {
    const [user, setUser] = useState(null);
    const [gamers, setGamers] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("/check_session").then((response) => {
            if (response.ok) {
                response.json().then((user) => setUser(user));
            }
        });
    }, []);

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

    return(
        <div>
            <Navbar onLogout={setUser} />
            <Routes>
                <Route path='/' element={<h2>Welcome, {user?.username}!</h2>} />
                <Route path='/login' element={<Login onLogin={setUser} />} />
                <Route path='/signup' element={<Signup addGamerState={addGamerState} />} />
                <Route path='/gamers' element={<GamersContainer gamers={gamers} />} />
                <Route path='/feed' element={<FeedContainer posts={posts} />} />
                <Route path='/account' element={user ? <MyAccount user={user} /> : <Navigate to='/login' />} />
            </Routes>
        </div>
    )
}

export default App;
