import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Authorization from './authorization';
import Profile from './profile';
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";
import { RequireAuth } from '../components/require-auth';
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  useInit(() => {
    store.actions.authorization.loginByToken()
  }, [], true);

  const select = useSelector((state) => ({
    isAuth: state.authorization.isAuth,
    isLoading: state.authorization.waiting,
  }));

  console.log(select.isLoading)
  const activeModal = useSelector(state => state.modals.name);
  if (select.isLoading) return ''
  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Authorization/>}/>
        <Route path={'/profile'} element={<RequireAuth auth={select.isAuth}>{<Profile/>}</RequireAuth>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
