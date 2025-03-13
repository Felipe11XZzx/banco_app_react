import './Welcome.css';
import Login from '../Login/Login';

const Welcome = ({ onLogin, currentAccount }) => {
  return (
    <nav>
      <p className="welcome">
        {currentAccount ? `Bienvenido/a, ${currentAccount.owner.split(' ')[0]}` : 'Inicia sesión para comenzar'}
      </p>
      <img src="logo.png" alt="Logo" className="logo" />
      {!currentAccount && <Login onLogin={onLogin} />}
    </nav>
  );
};

export default Welcome;
