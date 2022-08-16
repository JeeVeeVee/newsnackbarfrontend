import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

import * as snackAPI from '../api/snack';
import {useAuth0} from "@auth0/auth0-react";
import {useAuth} from "./AuthProvider";

export const snackContext = createContext();
export const useSnack = () => useContext(snackContext);

export const SnackProvider = ({
                                  children
                              }) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [snacks, setSnacks] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const {ready} = useAuth();


    const refreshSnacks = useCallback(async () => {
        console.log("refreshSnacks");
        try {
            setError();
            setLoading(true);
            const data = await snackAPI.getAllSnacks();
            setSnacks(data);
            return data;
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!initialized && ready) {
            refreshSnacks();
            setInitialized(true);
        }
    }, [refreshSnacks, initialized, ready]);

    const getAllSnacksInSnackbar = useCallback(async (snackbarID) => {
        if(ready){
            try {
                setError();
                setLoading(true);
                return await snackAPI.getAllSnacksInSnackbar(snackbarID);
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        return []
    }, [ready])

    const getAllSnacks = useCallback(async () => {
        try {
            setError();
            setLoading(true);
            return await snackAPI.getAllSnacks();
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const value = useMemo(() => ({
        loading, error, refreshSnacks, getAllSnacks, getAllSnacksInSnackbar, snacks
    }), [snacks, loading, error, refreshSnacks, getAllSnacks, getAllSnacksInSnackbar]);

    return <snackContext.Provider value={value}>{children}</snackContext.Provider>;
}