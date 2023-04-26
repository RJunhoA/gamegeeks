import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';
import Signup from './Signup';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("/check_session").then((response) => {
            if (response.ok) {
                response.json().then((user) => setUser(user));
            }
        });
    }, []);

    return(
        <div>
            <Navbar onLogout={setUser} />
            <Routes>
                <Route path='/' element={<h2>Welcome, {user?.username}!</h2>} />
                <Route path='/login' element={<Login onLogin={setUser} />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
            
            
        </div>
    )
}

export default App;
