import { NavLink } from 'react-router-dom'

function Navbar({onLogout}) {
    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogout(null));
    }

    return (
    <nav>
        <ul>
            <li>
                <NavLink to="/" >
                    Home
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
                <NavLink to="/login" >
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink to="/account" >
                    My Account
                </NavLink>
            </li>
            <li>
                <NavLink to="/signup" >
                    Signup
                </NavLink>
            </li>
            <li>
                <button onClick={handleLogout}>Logout</button>
            </li>
      </ul>
    </nav>
  );
}

export default Navbar