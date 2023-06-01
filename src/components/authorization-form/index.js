import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function AuthorizationForm() {
  const cn = bem('AuthorizationForm');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <div className={cn('wrapper')}> 
      <div className={cn('field')}>
        <label htmlFor="login">Логин</label>
        <input id="login" type="text" />
      </div>
      <div className={cn('field')}>
        <label htmlFor="password">Пароль</label>
        <input id="password" type="text" />
      </div>
      </div>
      <button onClick={() => onAdd(article._id)}>Войти</button>
    </div>
  );
}

// ArticleCard.propTypes = {
//   article: PropTypes.shape({
//     _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     description: PropTypes.string,
//     madeIn: PropTypes.object,
//     category: PropTypes.object,
//     edition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     price: PropTypes.number
//   }).isRequired,
//   onAdd: PropTypes.func,
//   t: PropTypes.func
// };

// ArticleCard.defaultProps = {
//   onAdd: () => {},
//   t: (text) => text
// }

export default memo(AuthorizationForm);
