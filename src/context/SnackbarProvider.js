import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

import * as snackbarAPI from '../api/snackbar';
import {useAuth} from "./AuthProvider";
import {useOrder} from "./OrderProvider";

export const snackbarContext = createContext();
export const useSnackbar = () => useContext(snackbarContext);

export const SnackbarProvider = ({
                                     children
                                 }) => {
    const {ready} = useAuth();
    const {currentOrderId, currentOrder} = useOrder();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [snackbars, setSnackbars] = useState({data : []});
    const [currentSnackbar, setCurrentSnackbar] = useState(false);
    const [initialized, setInitialized] = useState(false);

    const refreshSnackbars = useCallback(async () => {
        console.log("refreshSnackbars");
        try {
            setError();
            setLoading(true);
            const data = await snackbarAPI.getAllSnackBars();
            console.log(data);
            setSnackbars(data);
            return data;
        } catch (error) {
            setError("error");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getCurrentSnackbar();
    }, [currentOrder]);

    const getCurrentSnackbar = async () => {
        if(currentOrder && currentOrder.data){
            let snackbarLoaded = await getSnackbarById(currentOrder.data[0].snackbar_id);
            setCurrentSnackbar(snackbarLoaded);
        }
        return currentSnackbar;
    }

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
        snackbars, loading, error, refreshSnackbars, getAllSnackbars, getSnackbarById, currentSnackbar, setCurrentSnackbar, getCurrentSnackbar
    }), [snackbars, loading, error, refreshSnackbars, getAllSnackbars,getSnackbarById, currentSnackbar, setCurrentSnackbar]);

    return (<snackbarContext.Provider value={value}>
        {children}
    </snackbarContext.Provider>);
}
