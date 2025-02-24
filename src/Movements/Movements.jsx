import './Movements.css';

const Movements = ({ movements }) => {
  return (
    <div className="movements">
      {movements.map((mov, i) => {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
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
  );
};

export default Movements;
