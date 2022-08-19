import React, {
    createContext, useContext, useEffect, useMemo, useState
} from 'react';
import * as api from '../api';


import {useAuth0} from "@auth0/auth0-react";

const authContext = createContext();

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({children}) => {
    const {loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently, isLoading} = useAuth0();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [initialized, setInitialized] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if(! isLoading){
            const getAccesTokenAsync = async () => {
                const token = await getAccessTokenSilently();
                api.setAuthToken(token);
            }

            if (!initialized) {
                setLoading(true);
                setError();
                setInitialized(true);
                console.log(isAuthenticated);
                if (isAuthenticated) {
                    getAccesTokenAsync().then(() => {
                        setLoading(false)
                        setReady(true);
                    });
                    //setLoading(false);
                } else {
                    //loginWithRedirect();
                    //api.setAuthToken();
                }
            }
        }
    }, [isAuthenticated, getAccessTokenSilently, initialized, isLoading]);

    const value = useMemo(() => ({
        user, setUser, loading, error, loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently, ready, setReady
    }), [user, loading, error, loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently, ready, setReady]);

    return <authContext.Provider value={value}>{children}</authContext.Provider>;
}