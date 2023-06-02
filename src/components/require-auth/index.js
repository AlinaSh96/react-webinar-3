import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

export function RequireAuth({ auth,  children}) {
    const location = useLocation(); 

    if (!auth ) {
        return <Navigate to='/' state={{ from: location }} replace/>;
    }

    return children;
}
