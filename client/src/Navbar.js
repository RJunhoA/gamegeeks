import { useContext } from 'react';
import { UserContext } from './context/user';
import { NavLink } from 'react-router-dom';

function Navbar() {

    const {user, setUser} = useContext(UserContext)

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => setUser(null));
    }

    return (
    <nav>
        <ul>
            <li>
                <NavLink to="/" >
                    GG
                </NavLink>
            </li>
            <li>
                <NavLink to="/profile" >
                    {user ? user.username : 'Profile'}
                </NavLink>
            </li>
            <li>
                <NavLink to="/gamers" >
                    Gamers
                </NavLink>
            </li>
            <li>
                <NavLink to="/feed" >
                    Feed
                </NavLink>
            </li>
            <li>
                <NavLink to="/account" >
                    My Account
                </NavLink>
            </li>
            <li>
                {user ? null :
                <NavLink to="/login" >
                    Login
                </NavLink>
                }
            </li>
            <li>
                {user ? null : 
                <NavLink to="/signup" >
                    Signup
                </NavLink>
                }
            </li>
            <li>
                {user ? <button onClick={handleLogout}>Logout</button> : null}
            </li>
      </ul>
    </nav>
  );
}

export default Navbar