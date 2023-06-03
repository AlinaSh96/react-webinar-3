import { memo } from "react";
import { Link } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Flex from "../../components/flex";

function AuthMenu() {
const store = useStore();
const { t } = useTranslate();

  const select = useSelector((state) => ({
    isAuth: state.authorization.isAuth,
    login: state.authorization.profile?.profile?.name,
  }));

  const onLogout = () => {
    store.actions.authorization.logOut();
  };


  return (
    <Flex justify="end" gap={4}>
      {select.isAuth ? (
        <>
        <Link to='/profile'>{select.login}</Link>
        <button onClick={onLogout}>{t('logout')}</button>
        </>
      ) : (
        <Link to='/login'>
          <button>{t('login')}</button>
        </Link>
      )}
    </Flex>
  );
}

export default memo(AuthMenu);
