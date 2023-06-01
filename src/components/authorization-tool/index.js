import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function AuthorizationTool(){
  return (
    <div className='AuthorizationTool'>
      <button>Вход</button>
    </div>
  )
}

// Authorization.propTypes = {
//   title: PropTypes.node,
//   children: PropTypes.node,
// };

export default memo(AuthorizationTool);
