import { useState, useEffect } from "react";
import "./App.css";
import accounts from "./accounts";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [movements, setMovements] = useState([]);
  const [balance, setBalance] = useState(0);
  const [summaryIn, setSummaryIn] = useState(0);
  const [summaryOut, setSummaryOut] = useState(0);

  // Create usernames for all accounts
  useEffect(() => {
    accounts.forEach((account) => {
      account.username = account.owner
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join("");
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const account = accounts.find((account) => account.username === username);

    if (account && account.pin === Number(pin)) {
      setCurrentAccount(account);
      setUsername("");
      setPin("");
      updateUI(account);
    } else {
      console.log("login incorrecto");
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
      .filter((movement) => movement > 0)
      .reduce((total, movement) => total + movement, 0);
    setSummaryIn(sumIn);

    const sumOut = movements
      .filter((movement) => movement < 0)
      .reduce((total, movement) => total + movement, 0);
    setSummaryOut(sumOut);
  };

  return (
    <>
      <nav>
        <p className="welcome">
          {currentAccount
            ? `Welcome back, ${currentAccount.owner.split(" ")[0]}`
            : "Log in to get started"}
        </p>
        <img src="logo.png" alt="Logo" className="logo" />
        <form className="login" onSubmit={handleLogin}>
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
      </nav>

      <main className="app" style={{ opacity: currentAccount ? 1 : 0 }}>
        {/* BALANCE */}
        <div className="balance">
          <div>
            <p className="balance__label">Current balance</p>
            <p className="balance__date">
              As of{" "}
              <span className="date">{new Date().toLocaleDateString()}</span>
            </p>
          </div>
          <p className="balance__value">{balance.toFixed(2)}€</p>
        </div>

        {/* MOVEMENTS */}
        <div className="movements">
          {movements.map((mov, i) => {
            const type = mov > 0 ? "deposit" : "withdrawal";
            return (
              <div className="movements__row" key={i}>
                <div className={`movements__type movements__type--${type}`}>
                  {i + 1} {type}
                </div>
                <div className="movements__date">3 days ago</div>
                <div className="movements__value">{mov.toFixed(2)}€</div>
              </div>
            );
          })}
        </div>

        {/* SUMMARY */}
        <div className="summary">
          <p className="summary__label">In</p>
          <p className="summary__value summary__value--in">
            {summaryIn.toFixed(2)}€
          </p>
          <p className="summary__label">Out</p>
          <p className="summary__value summary__value--out">
            {Math.abs(summaryOut).toFixed(2)}€
          </p>
          <p className="summary__label">Interest</p>
          <p className="summary__value summary__value--interest">0.00€</p>
          <button className="btn--sort">↓ SORT</button>
        </div>

        {/* OPERATION: TRANSFERS */}
        <div className="operation operation--transfer">
          <h2>Transfer money</h2>
          <form className="form form--transfer">
            <input type="text" className="form__input form__input--to" />
            <input type="number" className="form__input form__input--amount" />
            <button className="form__btn form__btn--transfer">→</button>
            <label className="form__label">Transfer to</label>
            <label className="form__label">Amount</label>
          </form>
        </div>

        {/* OPERATION: LOAN */}
        <div className="operation operation--loan">
          <h2>Request loan</h2>
          <form className="form form--loan">
            <input
              type="number"
              className="form__input form__input--loan-amount"
            />
            <button className="form__btn form__btn--loan">→</button>
            <label className="form__label form__label--loan">Amount</label>
          </form>
        </div>

        {/* OPERATION: CLOSE */}
        <div className="operation operation--close">
          <h2>Close account</h2>
          <form className="form form--close">
            <input type="text" className="form__input form__input--user" />
            <input
              type="password"
              maxLength="6"
              className="form__input form__input--pin"
            />
            <button className="form__btn form__btn--close">→</button>
            <label className="form__label">Confirm user</label>
            <label className="form__label">Confirm PIN</label>
          </form>
        </div>

        {/* LOGOUT TIMER */}
        <p className="logout-timer">
          You will be logged out in <span className="timer">05:00</span>
        </p>
      </main>
    </>
  );
}

export default App;
