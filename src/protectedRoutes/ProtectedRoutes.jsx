import React, {useContext} from 'react';
import { UserContext } from '../context/UserProvider';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const {userData} = useContext(UserContext)
    return userData != '' ? (
        <>{children}</>
    ):
    (
        <Navigate to='/signin' />
    )
   
};

export default ProtectedRoutes;