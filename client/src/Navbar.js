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
            {/* <li>
                <NavLink to="/myaccount" >
                    Profile
                </NavLink>
            </li> */}
            <li>
                <NavLink to="/login" >
                    Login
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