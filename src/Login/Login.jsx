import { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, pin);
    setUsername('');
    setPin('');
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="user"
        className="login__input login__input--user"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="PIN"
        maxLength="4"
        className="login__input login__input--pin"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <button className="login__btn">→</button>
    </form>
  );
};

export default Login;
