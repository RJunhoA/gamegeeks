import { useState } from "react";
import { useContext } from 'react';
import { UserContext } from './context/user';
import { useNavigate } from 'react-router-dom'


function Login() {
    const {setUser, sessionCheck} = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] =useState("")
    const navigate = useNavigate()



    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                username: username,
                password: password
            }),
        })
        .then(r => {
            if (r.ok) {
                return r.json().then(user => {
                    setUser(user);
                    sessionCheck();
                    navigate('/feed')
                })
            } else {
                alert("Must enter valid username and password")
            }
        })
        .catch(error => {
            console.error('Error:', error)
        })
    }
    

    return (
      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    );
}

export default Login