import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import List from "../list";
import ItemBasket from "../itemBasket";

function Basket({ basket, onDeleteItem, totalPrice }) {
  return (
    <div className="Basket">
      {basket.length > 0 ? (
        <>
          <List
            list={basket}
            ElementView={ItemBasket}
            onDeleteItem={onDeleteItem}
          />
          <div className="Basket-foooter">
              <span className="Basket-foooter-text" >Итого</span> <span>{totalPrice.toLocaleString()} &#8381;</span>
          </div>
        </>
      ) : (
        <h2>В корзине отсутвуют товары</h2>
      )} 
    </div>
  );
}

Basket.propTypes = {
  basket: PropTypes.arrayOf( PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  })),
  onDeleteItem: PropTypes.func,
  totalPrice: PropTypes.number,
};

Basket.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(Basket);
