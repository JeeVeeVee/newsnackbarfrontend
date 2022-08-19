import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

import * as snackAPI from '../api/snack';
import {useAuth} from "./AuthProvider";
import {useOrder} from "./OrderProvider";

export const snackContext = createContext();
export const useSnack = () => useContext(snackContext);

export const SnackProvider = ({
                                  children
                              }) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [snacks, setSnacks] = useState([]);
    const [currentSnack, setCurrentSnack] = useState([]);
    const {ready} = useAuth();
    const {currentOrder} = useOrder();


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

    const getCurrentSnacks = useCallback( async () => {
        if(currentOrder && currentOrder.data){
            let currentSnackLoad = await getAllSnacksInSnackbar(currentOrder.data[0].snackbar_id);
            setCurrentSnack(currentSnackLoad);
            return currentSnackLoad;
        }
    }, [currentOrder, getAllSnacksInSnackbar]);

    useEffect(() => {
        getCurrentSnacks();
        console.log("refreshcurrentSnacks")
    }, [currentOrder, getCurrentSnacks]);



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
        loading, error, refreshSnacks, getAllSnacks, getAllSnacksInSnackbar, snacks, currentSnack, setCurrentSnack, getCurrentSnacks
    }), [snacks, loading, error, refreshSnacks, getAllSnacks, getAllSnacksInSnackbar, currentSnack, setCurrentSnack, getCurrentSnacks]);

    return <snackContext.Provider value={value}>{children}</snackContext.Provider>;
}