import './Summary.css';

const Summary = ({ summaryIn, summaryOut, onSort, sorted }) => {
  return (
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
      <button className="btn--sort" onClick={onSort}>
        {sorted ? '↑' : '↓'} ORDENAR
      </button>
    </div>
  );
};

export default Summary;
