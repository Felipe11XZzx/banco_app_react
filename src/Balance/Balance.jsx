import './Balance.css';

const Balance = ({ balance }) => {
  return (
    <div className="balance">
      <div>
        <p className="balance__label">Current balance</p>
        <p className="balance__date">
          As of <span className="date">
            {new Date().toLocaleDateString()}
          </span>
        </p>
      </div>
      <p className="balance__value">{balance.toFixed(2)}€</p>
    </div>
  );
};

export default Balance;
