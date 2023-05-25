import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';

function Main() {
  const DEFAULT_LIMIT = 10;
  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    store.actions.catalog.load(DEFAULT_LIMIT, (currentPage-1) * 10);
  }, [currentPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    skip: state.catalog.skip,
    limit: state.catalog.limit,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination  currentPage={currentPage} onPageChange={page => setCurrentPage(page)} count={select.count} skip={select.skip} limit={select.limit}/>
    </PageLayout>

  );
}

export default memo(Main);
