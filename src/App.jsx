import { useState, useEffect } from "react";
import "./App.css";
import accounts from "./accounts";
import { faker } from '@faker-js/faker';
import moment from 'moment';
import 'moment/locale/es';

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
  const [allAccounts, setAllAccounts] = useState([]);
  const [sorted, setSorted] = useState(false);

  // Create usernames for all accounts
  useEffect(() => {
    // Convertir los movimientos existentes a objetos con fecha
    const updatedAccounts = accounts.map((account) => ({
      ...account,
      username: account.owner
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join(""),
      // Transformar los movimientos a objetos con fecha y cantidad
      movements: account.movements.map(mov => ({
        amount: mov,
        // Generar fechas aleatorias en el último año
        date: faker.date.recent({ days: faker.number.int({ min: 1, max: 365 }) })
      }))
    }));
    
    setAllAccounts(updatedAccounts);
  }, []);

  const handleLogin = (username, pin) => {
    const account = allAccounts.find(
      (account) => account.username === username
    );

    if (account && account.pin === Number(pin)) {
      setCurrentAccount(account);
      updateUI(account);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleTransfer = (receiverAccount, amount) => {
    // Find current account in allAccounts to ensure we're working with latest state
    const updatedAccounts = [...allAccounts];
    const senderIndex = updatedAccounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    const receiverIndex = updatedAccounts.findIndex(
      (acc) => acc.username === receiverAccount.username
    );

    if (senderIndex !== -1 && receiverIndex !== -1) {
      const newMovement = {
        amount: -amount,
        date: new Date()
      };
      
      const receiverMovement = {
        amount: amount,
        date: new Date()
      };
      
      // Add negative movement to current account
      updatedAccounts[senderIndex].movements.push(newMovement);
      // Add positive movement to receiver account
      updatedAccounts[receiverIndex].movements.push(receiverMovement);

      // Update all states
      setAllAccounts(updatedAccounts);
      setCurrentAccount(updatedAccounts[senderIndex]);
      updateUI(updatedAccounts[senderIndex]);
    }
  };

  const handleLoan = (amount) => {
    const updatedAccounts = [...allAccounts];
    const accountIndex = updatedAccounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    if (accountIndex !== -1) {
      // Calcular el balance actual
      const currentBalance = updatedAccounts[accountIndex].movements
        .reduce((acc, mov) => acc + mov.amount, 0);
      
      // Verificar que el préstamo no exceda el 200% del balance
      if (amount > currentBalance * 2) {
        alert("El préstamo no puede exceder el 200% de tu balance actual");
        return;
      }
      
      // Verificar si tiene al menos un depósito del 10% del monto solicitado
      if (!updatedAccounts[accountIndex].movements.some(mov => mov.amount >= amount * 0.1)) {
        alert("Necesitas al menos un depósito del 10% del monto solicitado");
        return;
      }
      
      // Add positive movement to current account
      updatedAccounts[accountIndex].movements.push({
        amount: amount,
        date: new Date()
      });

      // Update states
      setAllAccounts(updatedAccounts);
      setCurrentAccount(updatedAccounts[accountIndex]);
      updateUI(updatedAccounts[accountIndex]);
    }
  };

  const handleClose = () => {
    const updatedAccounts = allAccounts.filter(
      (acc) => acc.username !== currentAccount.username
    );
    setAllAccounts(updatedAccounts);
    setCurrentAccount(null);
    setMovements([]);
    setBalance(0);
    setSummaryIn(0);
    setSummaryOut(0);
  };

  const updateUI = (account) => {
    // Si está ordenado, ordenar los movimientos por fecha
    const movs = sorted 
      ? [...account.movements].sort((a, b) => new Date(b.date) - new Date(a.date))
      : account.movements;
      
    setMovements(movs);
    displayBalance(account.movements);
    displaySummary(account.movements);
  };

  const displayBalance = (movements) => {
    const balance = movements.reduce((total, movement) => total + movement.amount, 0);
    setBalance(balance);
  };

  const displaySummary = (movements) => {
    const sumIn = movements
      .filter((movement) => movement.amount > 0)
      .reduce((total, movement) => total + movement.amount, 0);
    setSummaryIn(sumIn);

    const sumOut = Math.abs(
      movements
        .filter((movement) => movement.amount < 0)
        .reduce((total, movement) => total + movement.amount, 0)
    );
    setSummaryOut(sumOut);
  };

  const handleSort = () => {
    setSorted(!sorted);
    updateUI(currentAccount);
  };

  return (
    <>
      <Welcome onLogin={handleLogin} currentAccount={currentAccount} />
      <main className="app" style={{ opacity: currentAccount ? 1 : 0 }}>
        <Balance balance={balance} />
        <Movements movements={movements} />
        <Summary 
          summaryIn={summaryIn} 
          summaryOut={summaryOut}
          onSort={handleSort}
          sorted={sorted}
        />
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
