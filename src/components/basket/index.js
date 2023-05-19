import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Head from "../head";
import List from "../list";


function Basket({
    basket
}){
    console.log(basket)
  return (
    <div className='Basket'>
     <List list={basket}/>
     Корзина
</div>
  )
}

// HeaderBasket.propTypes = {
//   basket: PropTypes.shape({
//     code: PropTypes.number,
//     title: PropTypes.string,
//     count: PropTypes.number,
//     price: PropTypes.number,
//   }).isRequired,
//   //onAdd: PropTypes.func,
// };

// HeaderBasketInfo.defaultProps = {
//   onAdd: () => {},
// };


export default React.memo(Basket);
