import './Welcome.css';
import Login from '../Login/Login';

const Welcome = ({ onLogin, currentAccount }) => {
  return (
    <nav>
      <p className="welcome">
        {currentAccount 
          ? `Welcome back, ${currentAccount.owner.split(' ')[0]}`
          : 'Log in to get started'}
      </p>
      <img src="logo.png" alt="Logo" className="logo" />
      <Login onLogin={onLogin} />
    </nav>
  );
};

export default Welcome;
