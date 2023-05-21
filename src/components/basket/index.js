import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import List from "../list";
import ItemBasket from "../itemBasket";

function Basket({ basket, onDeleteItem, totalPrice}) {
  return (
    <div className="Basket">
      <List list={basket} ElementView={ItemBasket}  onDeleteItem={onDeleteItem}/>
      { basket.length && <div className="Basket-summary">
        <p className="Basket-summary-text">Итого {totalPrice.toLocaleString()}</p></div>}
    </div>
  );
}

Basket.propTypes = {
  basket: PropTypes.array.isRequired, 
  onDeleteItem: PropTypes.func,
  totalPrice: PropTypes.number
};

Basket.defaultProps = {
  onDeleteItem: () => {}
}

export default React.memo(Basket);
