import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

import * as snackbarAPI from '../api/snackbar';

export const snackbarContext = createContext();
export const useSnackbar = () => useContext(snackbarContext);

export const SnackbarProvider = ({
                                     children
                                 }) => {
    const [currentSnackbar, setCurrentSnackbar] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [snackbars, setSnackbars] = useState([]);
    const [initialized, setInitialized] = useState(false);

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

    useEffect(() => {
        if (!initialized) {
            refreshSnackbars();
            setInitialized(true);
        }
    }, [refreshSnackbars, initialized]);

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
        snackbars, loading, error, refreshSnackbars, getAllSnackbars, currentSnackbar, setCurrentSnackbar
    }), [snackbars, loading, error, refreshSnackbars, getAllSnackbars, currentSnackbar]);

    return (<snackbarContext.Provider value={value}>
        {children}
    </snackbarContext.Provider>);
}
