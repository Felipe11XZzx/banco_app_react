import { useState, useEffect } from 'react';
import './App.css';
import accounts from './accounts';

// Import components
import Welcome from './Welcome/Welcome';
import Balance from './Balance/Balance';
import Movements from './Movements/Movements';
import Summary from './Summary/Summary';
import Operations from './Operations/Operations';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [movements, setMovements] = useState([]);
  const [balance, setBalance] = useState(0);
  const [summaryIn, setSummaryIn] = useState(0);
  const [summaryOut, setSummaryOut] = useState(0);

  // Create usernames for all accounts
  useEffect(() => {
    accounts.forEach(account => {
      account.username = account.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('');
    });
  }, []);

  const handleLogin = (username, pin) => {
    const account = accounts.find(
      account => account.username === username
    );

    if (account && account.pin === Number(pin)) {
      setCurrentAccount(account);
      updateUI(account);
    } else {
      console.log('login incorrecto');
    }
  };

  const updateUI = (account) => {
    setMovements(account.movements);
    displayBalance(account.movements);
    displaySummary(account.movements);
  };

  const displayBalance = (movements) => {
    const balance = movements.reduce((total, movement) => total + movement, 0);
    setBalance(balance);
  };

  const displaySummary = (movements) => {
    const sumIn = movements
      .filter(movement => movement > 0)
      .reduce((total, movement) => total + movement, 0);
    setSummaryIn(sumIn);

    const sumOut = movements
      .filter(movement => movement < 0)
      .reduce((total, movement) => total + movement, 0);
    setSummaryOut(sumOut);
  };

  return (
    <>
      <Welcome onLogin={handleLogin} currentAccount={currentAccount} />

      <main className="app" style={{ opacity: currentAccount ? 1 : 0 }}>
        <Balance balance={balance} />
        <Movements movements={movements} />
        <Summary summaryIn={summaryIn} summaryOut={summaryOut} />
        <Operations />

        {/* LOGOUT TIMER */}
        <p className="logout-timer">
          You will be logged out in <span className="timer">05:00</span>
        </p>
      </main>
    </>
  );
}

export default App;
