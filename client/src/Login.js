import { useState } from "react";
import { useContext } from 'react';
import { UserContext } from './context/user';


function Login() {
    const {setUser} = useContext(UserContext)
    const [username, setUsername] = useState("");
    const [password, setPassword] =useState("")

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
                    r.json()
                    .then(user => setUser(user))
                } else {
                    alert("Must enter valid username and password")
                }
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
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    );
}

export default Login