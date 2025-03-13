import './Movements.css';
import moment from 'moment';
import 'moment/locale/es';

const Movements = ({ movements }) => {
  // Configurar moment en español
  moment.locale('es');
  
  return (
    <div className="movements">
      {movements.map((mov, i) => {
        const type = mov.amount > 0 ? 'deposit' : 'withdrawal';
        // Formatear la fecha con moment para mostrar "hace X días"
        const formattedDate = moment(mov.date).fromNow();
        
        return (
          <div className="movements__row" key={i}>
            <div className={`movements__type movements__type--${type}`}>
              {i + 1} {type}
            </div>
            <div className="movements__date">{formattedDate}</div>
            <div className="movements__value">{mov.amount.toFixed(2)}€</div>
          </div>
        );
      })}
    </div>
  );
};

export default Movements;
