import { useContext, useState } from 'react';
import { UserContext } from './context/user';

function MyAccount() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user?.username);
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(user?.image);
  const [about, setAbout] = useState(user?.about);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
      image,
      about,
    };

    fetch(`/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser);
      });
  };

  return (
    <div>
      <h1>Account Page</h1>
      <img src={image} alt="profile pic" />
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <label>
          Image:
          <input type="text" value={image} onChange={handleImageChange} />
        </label>
        <br />
        <label>
          About:
          <textarea value={about} onChange={handleAboutChange} />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
      <p>Account Created: {user?.created_at}</p>
    </div>
  );
}

export default MyAccount;
