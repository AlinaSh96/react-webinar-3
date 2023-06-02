import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Flex from "../../components/flex";

function AuthMenu(props) {
const store = useStore();

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
        <button onClick={onLogout}>Выход</button>
        </>
      ) : (
        <Link to='/login'>
          <button>Вход</button>
        </Link>
      )}
    </Flex>
  );
}

// Authorization.propTypes = {
//   title: PropTypes.node,
//   children: PropTypes.node,
// };

export default memo(AuthMenu);