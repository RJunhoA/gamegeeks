import { useState } from "react";

function Signup({addGamerState}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
  
    const user = {
        username: username,
        password: password,
        image: image
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
            .then(r => {
                if (r.ok){
                    r.json().then(addGamerState(user))
                } else {
                    console.log('failure')
                }   
            })
        e.target.reset()
    }


    return(
        <div>
            <div>
                Welcome to GameGeeks!
            </div>
            <div>
                <div>
                    <h2>Create a New Account</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="username" />
                    </div>
                    <div>
                        <input onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="password" />
                    </div>
                    <div>
                        <input onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="profile photo URL" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup