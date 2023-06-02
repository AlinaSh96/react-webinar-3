import { memo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";

function RequireAuth({ auth,  children}) {
    const location = useLocation(); 
    if (!auth ) {
        return <Navigate to='/' state={{ from: location }} replace/>;
    }
    return children;
}

RequireAuth.propTypes = {
    auth: PropTypes.bool,
    children: PropTypes.element,
  };


export default memo(RequireAuth);