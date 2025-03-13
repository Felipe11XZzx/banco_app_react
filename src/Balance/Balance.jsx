import './Balance.css';
import moment from 'moment';
import 'moment/locale/es';

const Balance = ({ balance }) => {
  // Configurar moment en español
  moment.locale('es');
  
  return (
    <div className="balance">
      <div>
        <p className="balance__label">Balance actual</p>
        <p className="balance__date">
          A fecha de <span className="date">
            {moment().format('LL')}
          </span>
        </p>
      </div>
      <p className="balance__value">{balance.toFixed(2)}€</p>
    </div>
  );
};

export default Balance;
