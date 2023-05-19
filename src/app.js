import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const basketList = store.getState().basket.list;
  const basket = store.getState().basket;


 const [isBasketShow, setIsBasketShow] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItemToBasket: useCallback((item) => {
      store.addBasket(item);
    }, [store]),

    onDeleteItemFromBasket: useCallback((item) => {
     // store.addBasket(item);
    }, [store]),

    onOpenModal: useCallback((item) => {
      setIsBasketShow(true)
    }, []),

    onCloseModal: useCallback((item) => {
      setIsBasketShow(false)
    }, []),
  }

  return (
    <>
    {isBasketShow && 
    <Modal isBasketShow={isBasketShow} title="Корзина" onCloseModal={callbacks.onCloseModal}>
      <Basket basket={basketList}/>
    </Modal>}
    <PageLayout>
      <Head title='Магазин'/>
      <Controls basket={basket} onOpenModal={callbacks.onOpenModal}/>
      <List list={list}
            onDeleteItem={callbacks.onDeleteItem}
            onAddItem={callbacks.onAddItemToBasket}/>
    </PageLayout>
    </>
  );
}

export default App;
