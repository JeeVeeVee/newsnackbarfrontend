import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useAuth} from "./AuthProvider";
import * as orderRowApi from '../api/orderRow';
import {getAllOrderRowsInOrder} from "../api/orderRow";

export const orderRowContext = createContext();
export const useOrderRow = () => useContext(orderRowContext);

export const OrderRowProvider = ({
                                     children
                                 }) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [orderRows, setOrderRows] = useState([]);
    const [currentOrderRows, setCurrentOrderRows] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({order_name : "", date : "", createdBy : ""});
    const [initialized, setInitialized] = useState(false);

    const {ready} = useAuth();

    const refreshOrderRows = useCallback(async () => {
        console.log(refreshOrderRows());
        try {
            setError();
            setLoading(true);
            const data = await orderRowApi.getAllOrderRows();
            setOrderRows(data);
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
            //refreshOrderRows();
            setInitialized(true);
        }
    }, [refreshOrderRows, ready]);

    const createOrderRow = useCallback(async (orderRow) => {
        console.log(orderRow);
        try {
            setError();
            setLoading(true);
            const data = await orderRowApi.createOrderRow(orderRow);
            setOrderRows([...orderRows, data]);
            return data;
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const getAllOrderRowsInOrder = useCallback(async (orderID) => {
        if(ready){
            try {
                setError();
                setLoading(true);
                const data = await orderRowApi.getAllOrderRowsInOrder(orderID);
                setOrderRows(data);
                return data;
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    }, [ready]);

    const value = useMemo(() => ({
        orderRows, refreshOrderRows, createOrderRow, error, loading, getAllOrderRowsInOrder
    }), [getAllOrderRowsInOrder, orderRows, refreshOrderRows, createOrderRow, error, loading]);

    return (<orderRowContext.Provider value={value}>{children}</orderRowContext.Provider>);
}