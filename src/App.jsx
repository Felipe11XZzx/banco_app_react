import { useState, useEffect } from "react";
import "./App.css";
import accounts from "./accounts";

// Import components
import Welcome from "./Welcome/Welcome";
import Balance from "./Balance/Balance";
import Movements from "./Movements/Movements";
import Summary from "./Summary/Summary";
import Operations from "./Operations/Operations";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [movements, setMovements] = useState([]);
  const [balance, setBalance] = useState(0);
  const [summaryIn, setSummaryIn] = useState(0);
  const [summaryOut, setSummaryOut] = useState(0);
  const [allAccounts, setAllAccounts] = useState(accounts);

  // Create usernames for all accounts
  useEffect(() => {
    const updatedAccounts = allAccounts.map(account => ({
      ...account,
      username: account.owner
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join("")
    }));
    setAllAccounts(updatedAccounts);
  }, []);

  const handleLogin = (username, pin) => {
    const account = allAccounts.find((account) => account.username === username);

    if (account && account.pin === Number(pin)) {
      setCurrentAccount(account);
      updateUI(account);
    } else {
      alert("Incorrect username or PIN");
    }
  };

  const handleTransfer = (receiverAccount, amount) => {
    // Find current account in allAccounts to ensure we're working with latest state
    const updatedAccounts = [...allAccounts];
    const senderIndex = updatedAccounts.findIndex(acc => acc.username === currentAccount.username);
    const receiverIndex = updatedAccounts.findIndex(acc => acc.username === receiverAccount.username);

    if (senderIndex !== -1 && receiverIndex !== -1) {
      // Add negative movement to current account
      updatedAccounts[senderIndex].movements.push(-amount);
      // Add positive movement to receiver account
      updatedAccounts[receiverIndex].movements.push(amount);
      
      // Update all states
      setAllAccounts(updatedAccounts);
      setCurrentAccount(updatedAccounts[senderIndex]);
      updateUI(updatedAccounts[senderIndex]);
    }
  };

  const handleLoan = (amount) => {
    const updatedAccounts = [...allAccounts];
    const accountIndex = updatedAccounts.findIndex(acc => acc.username === currentAccount.username);

    if (accountIndex !== -1) {
      // Add positive movement to current account
      updatedAccounts[accountIndex].movements.push(amount);
      
      // Update states
      setAllAccounts(updatedAccounts);
      setCurrentAccount(updatedAccounts[accountIndex]);
      updateUI(updatedAccounts[accountIndex]);
    }
  };

  const handleClose = () => {
    const updatedAccounts = allAccounts.filter(acc => acc.username !== currentAccount.username);
    setAllAccounts(updatedAccounts);
    setCurrentAccount(null);
    setMovements([]);
    setBalance(0);
    setSummaryIn(0);
    setSummaryOut(0);
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
      .filter((movement) => movement > 0)
      .reduce((total, movement) => total + movement, 0);
    setSummaryIn(sumIn);

    const sumOut = Math.abs(movements
      .filter((movement) => movement < 0)
      .reduce((total, movement) => total + movement, 0));
    setSummaryOut(sumOut);
  };

  return (
    <>
      <Welcome onLogin={handleLogin} currentAccount={currentAccount} />

      <main className="app" style={{ opacity: currentAccount ? 1 : 0 }}>
        <Balance balance={balance} />
        <Movements movements={movements} />
        <Summary summaryIn={summaryIn} summaryOut={summaryOut} />
        <Operations 
          currentAccount={currentAccount}
          accounts={allAccounts}
          onTransfer={handleTransfer}
          onLoan={handleLoan}
          onClose={handleClose}
        />

        {/* LOGOUT TIMER */}
        <p className="logout-timer">
          You will be logged out in <span className="timer">05:00</span>
        </p>
      </main>
    </>
  );
}

export default App;
