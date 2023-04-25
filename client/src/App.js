import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';

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
            </Routes>
            
            
        </div>
    )
}

export default App;
