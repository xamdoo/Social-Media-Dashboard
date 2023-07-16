import React from 'react';
import { Navigate } from 'react-router-dom';
import UseUserSocialMedia from '../Hooks/UseUserSocialMedia';
import LoadingSpinner from '../Components/Skeleton/LoadingSpinner';

function ProtectedRoute({ children }) {
    const { isFacebookConnected, isLoading } = UseUserSocialMedia();
    
    if(isLoading || isFacebookConnected === null ){
        return <LoadingSpinner/>
    }
    
    if (isFacebookConnected === false) {
    
        return <Navigate to="/platforms" />;
    }
    
    return children;
}

export default ProtectedRoute
