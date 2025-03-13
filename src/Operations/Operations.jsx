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
    const currentBalance = currentAccount.movements.reduce((acc, mov) => acc + mov.amount, 0);

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
        alert('¡Destinatario no encontrado!');
      } else if (amount <= 0) {
        alert('¡Por favor ingrese un monto válido!');
      } else if (currentBalance < amount) {
        alert('¡Fondos insuficientes!');
      } else if (receiverAccount?.username === currentAccount.username) {
        alert('¡No se puede transferir a la misma cuenta!');
      }
    }
  };

  const handleLoan = (e) => {
    e.preventDefault();
    const amount = Number(loanAmount);

    if (amount > 0) {
      onLoan(amount);
      setLoanAmount('');
    } else {
      alert('Por favor ingrese un monto válido para el préstamo.');
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
      alert('¡Credenciales inválidas!');
    }
  };

  return (
    <>
      {/* OPERATION: TRANSFERS */}
      <div className="operation operation--transfer">
        <h2>Transferir dinero</h2>
        <form className="form form--transfer" onSubmit={handleTransfer}>
          <input
            type="text"
            className="form__input form__input--to"
            value={transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
            placeholder="Usuario"
          />
          <input
            type="number"
            className="form__input form__input--amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="Monto"
          />
          <button className="form__btn form__btn--transfer">→</button>
          <label className="form__label">Transferir a</label>
          <label className="form__label">Monto</label>
        </form>
      </div>

      {/* OPERATION: LOAN */}
      <div className="operation operation--loan">
        <h2>Solicitar préstamo</h2>
        <form className="form form--loan" onSubmit={handleLoan}>
          <input
            type="number"
            className="form__input form__input--loan-amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Monto"
          />
          <button className="form__btn form__btn--loan">→</button>
          <label className="form__label form__label--loan">Monto</label>
        </form>
      </div>

      {/* OPERATION: CLOSE */}
      <div className="operation operation--close">
        <h2>Cerrar cuenta</h2>
        <form className="form form--close" onSubmit={handleClose}>
          <input
            type="text"
            className="form__input form__input--user"
            value={closeUser}
            onChange={(e) => setCloseUser(e.target.value)}
            placeholder="Usuario"
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
          <label className="form__label">Confirmar usuario</label>
          <label className="form__label">Confirmar PIN</label>
        </form>
      </div>
    </>
  );
};

export default Operations;
