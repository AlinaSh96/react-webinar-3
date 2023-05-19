import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Modal({
    children,
    title,
    onCloseModal,
}){
  return (
    <div className='Modal'>
    <div className='Modal-overlay'>
        <div className='Modal-content'>
        <header className={'BasketHeader'}>
              <h1 className={'BasketHeader-title'}>{title}</h1>
              <button onClick={onCloseModal} className={'BasketHeader-button_close'}>
                Закрыть
              </button>
        </header>
          {children}
        </div>
    </div>
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


export default React.memo(Modal);
