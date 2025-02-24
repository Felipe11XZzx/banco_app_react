import { useState } from 'react';
import './Operations.css';

const Operations = ({ currentAccount, accounts, onTransfer, onLoan, onClose }) => {
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [closeUser, setCloseUser] = useState('');
  const [closePin, setClosePin] = useState('');

  const handleTransfer = (e) => {
    e.preventDefault();
    const amount = Number(transferAmount);
    const receiverAccount = accounts.find(acc => acc.username === transferTo);
    
    // Calculate current balance
    const currentBalance = currentAccount.movements.reduce((acc, mov) => acc + mov, 0);

    if (amount > 0 && 
        receiverAccount && 
        currentBalance >= amount && 
        receiverAccount?.username !== currentAccount.username) {
      onTransfer(receiverAccount, amount);
      setTransferTo('');
      setTransferAmount('');
    } else {
      // Add error feedback
      if (!receiverAccount) {
        alert('Recipient not found!');
      } else if (amount <= 0) {
        alert('Please enter a valid amount!');
      } else if (currentBalance < amount) {
        alert('Insufficient funds!');
      } else if (receiverAccount?.username === currentAccount.username) {
        alert('Cannot transfer to same account!');
      }
    }
  };

  const handleLoan = (e) => {
    e.preventDefault();
    const amount = Number(loanAmount);

    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
      onLoan(amount);
      setLoanAmount('');
    } else {
      alert('Loan request denied. You need at least one deposit of 10% of the requested amount.');
    }
  };

  const handleClose = (e) => {
    e.preventDefault();

    if (closeUser === currentAccount.username && 
        Number(closePin) === currentAccount.pin) {
      onClose();
      setCloseUser('');
      setClosePin('');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <>
      {/* OPERATION: TRANSFERS */}
      <div className="operation operation--transfer">
        <h2>Transfer money</h2>
        <form className="form form--transfer" onSubmit={handleTransfer}>
          <input
            type="text"
            className="form__input form__input--to"
            value={transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
            placeholder="Username"
          />
          <input
            type="number"
            className="form__input form__input--amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="Amount"
          />
          <button className="form__btn form__btn--transfer">→</button>
          <label className="form__label">Transfer to</label>
          <label className="form__label">Amount</label>
        </form>
      </div>

      {/* OPERATION: LOAN */}
      <div className="operation operation--loan">
        <h2>Request loan</h2>
        <form className="form form--loan" onSubmit={handleLoan}>
          <input
            type="number"
            className="form__input form__input--loan-amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Amount"
          />
          <button className="form__btn form__btn--loan">→</button>
          <label className="form__label form__label--loan">Amount</label>
        </form>
      </div>

      {/* OPERATION: CLOSE */}
      <div className="operation operation--close">
        <h2>Close account</h2>
        <form className="form form--close" onSubmit={handleClose}>
          <input
            type="text"
            className="form__input form__input--user"
            value={closeUser}
            onChange={(e) => setCloseUser(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            maxLength="6"
            className="form__input form__input--pin"
            value={closePin}
            onChange={(e) => setClosePin(e.target.value)}
            placeholder="PIN"
          />
          <button className="form__btn form__btn--close">→</button>
          <label className="form__label">Confirm user</label>
          <label className="form__label">Confirm PIN</label>
        </form>
      </div>
    </>
  );
};

export default Operations;
