import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Basket from './components/basket';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const basketList = store.getState().basket.list;
  const totalPrice = store.getState().basket.totalPrice;
  const basket = store.getState().basket;


 const [isBasketShow, setIsBasketShow] = useState(false);

  const callbacks = {
    onDeleteItem: useCallback((code, count) => {
      store.deleteItem(code, count);
    }, [store]),

    onAddItemToBasket: useCallback((item) => {
      store.addBasket(item);
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
      <Basket onDeleteItem={callbacks.onDeleteItem} basket={basketList} totalPrice={totalPrice}/>
    </Modal>}
    <PageLayout>
      <Head title='Магазин'/>
      <Controls basket={basket} onOpenModal={callbacks.onOpenModal}/>
      <List list={list}
            onAddItem={callbacks.onAddItemToBasket}
            ElementView={Item}/>
    </PageLayout>
    </>
  );
}

export default App;
