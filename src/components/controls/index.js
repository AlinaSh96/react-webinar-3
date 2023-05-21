import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import HeaderBasket from "../headerBasket";

function Controls({onOpenModal, basket}){
  return (
    <div className='Controls'>
      <HeaderBasket basket={basket}/>
      <button onClick={() => onOpenModal()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  basket: PropTypes.object.isRequired,
};

Controls.defaultProps = {
  onOpenModal: () => {}
}

export default React.memo(Controls);
