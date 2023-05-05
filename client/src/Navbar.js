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
                <NavLink to="/" className="styled-link">
                    GG
                </NavLink>
            </li>
            <li>
                <NavLink to="/profile" className="styled-link">
                    {user ? user.username : 'Profile'}
                </NavLink>
            </li>
            <li>
                <NavLink to="/gamers" className="styled-link">
                    Gamers
                </NavLink>
            </li>
            <li>
                <NavLink to="/feed" className="styled-link">
                    Feed
                </NavLink>
            </li>
            <li>
                <NavLink to="/account" className="styled-link">
                    My Account
                </NavLink>
            </li>
            <li style={{marginLeft: user ? 0 : '20px'}}>
                {user ? null :
                <NavLink to="/login" className="styled-link">
                    Login
                </NavLink>
                }
            </li>
            <li style={{marginLeft: user ? 0 : '20px'}}>
                {user ? null : 
                <NavLink to="/signup" className="styled-link">
                    Signup
                </NavLink>
                }
            </li>
            <li>
                {user ? <NavLink onClick={handleLogout} className="styled-link">Logout</NavLink> : null}
            </li>
      </ul>
    </nav>
  );
}

export default Navbar