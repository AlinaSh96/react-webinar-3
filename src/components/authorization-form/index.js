import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import './style.css';


function AuthorizationForm() {
  const cn = bem('AuthorizationForm');
  const store = useStore();
  const { t } = useTranslate();

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
      <h2 className={cn('title')}>{t('login')}</h2>
      <div className={cn('wrapper')}> 
      <div className={cn('field')}>
        <label htmlFor="login">{t('userLogin')}</label>
        <input id="login" type="text" name="name"/>
      </div>
      <div className={cn('field')}>
        <label htmlFor="password">{t('password')}</label>
        <input id="password" type="text" name="password"/>
      </div>
      </div>
      <p className={cn('error')}>
        {!!select.error && select.error}
      </p>
      <button>{t('signIn')}</button>
    </form>
  );
}

export default memo(AuthorizationForm);
