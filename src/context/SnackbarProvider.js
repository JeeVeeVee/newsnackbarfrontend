import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

import * as snackbarAPI from '../api/snackbar';
import {useAuth0} from "@auth0/auth0-react";
import {useAuth} from "./AuthProvider";
import * as snackAPI from "../api/snack";

export const snackbarContext = createContext();
export const useSnackbar = () => useContext(snackbarContext);

export const SnackbarProvider = ({
                                     children
                                 }) => {
    const {ready} = useAuth();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [snackbars, setSnackbars] = useState({data : []});
    const [initialized, setInitialized] = useState(false);
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();

    const refreshSnackbars = useCallback(async () => {
        console.log("refreshSnackbars");
        try {
            setError();
            setLoading(true);
            const data = await snackbarAPI.getAllSnackBars();
            setSnackbars(data);
            return data;
        } catch (error) {
            setError("error");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const getSnackbarById = useCallback(async (snackbarID) => {
        if(ready){
            try {
                setError();
                setLoading(true);
                return await snackbarAPI.getSnackBarById(snackbarID);
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        return []
    }, [ready])

    useEffect(() => {
        if (!initialized && ready) {
            refreshSnackbars();
            setInitialized(true);
        }
    }, [refreshSnackbars, initialized, ready]);

    const getAllSnackbars = useCallback(async () => {
        try {
            setError();
            setLoading(true);
            return await snackbarAPI.getAllSnackBars();
        } catch (error) {
            setError("error")
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const value = useMemo(() => ({
        snackbars, loading, error, refreshSnackbars, getAllSnackbars, getSnackbarById
    }), [snackbars, loading, error, refreshSnackbars, getAllSnackbars,getSnackbarById]);

    return (<snackbarContext.Provider value={value}>
        {children}
    </snackbarContext.Provider>);
}
