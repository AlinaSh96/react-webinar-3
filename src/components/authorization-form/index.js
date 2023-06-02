import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function AuthorizationForm() {
  const cn = bem('AuthorizationForm');
  const store = useStore();

  const select = useSelector((state) => ({
    error: state.authorization.error,
  }));


  const onAuth = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); 
    const login = formData.get('name'); 
    const password = formData.get('password'); 
    store.actions.authorization.loginByUsername({login, password})
  }

  return (
    <form onSubmit={(e) => onAuth(e)} className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <div className={cn('wrapper')}> 
      <div className={cn('field')}>
        <label htmlFor="login">Логин</label>
        <input id="login" type="text" name="name"/>
      </div>
      <div className={cn('field')}>
        <label htmlFor="password">Пароль</label>
        <input id="password" type="text" name="password"/>
      </div>
      </div>
      <p className={cn('error')}>
        {!!select.error && select.error}
      </p>
      <button>Войти</button>
    </form>
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
