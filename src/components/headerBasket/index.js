import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function HeaderBasket({basket}){
  return (
    <div className='HeaderBasket'>
      <span>В корзине:
        {basket.totalCount > 0 ? 
        <span className='HeaderBasket-info'>{basket.totalCount} {plural(basket.totalCount, {one: 'товар', few: 'товара', many: 'товаров'})} / {basket.totalPrice} &#8381;</span>
        : <span className='HeaderBasket-info'>Пусто</span>
        }
        </span>
    </div>
  )
}

HeaderBasket.propTypes = {
  basket: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  //onAdd: PropTypes.func,
};

// HeaderBasketInfo.defaultProps = {
//   onAdd: () => {},
// };


export default React.memo(HeaderBasket);
