import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

import * as orderApi from '../api/order';

export const orderContext = createContext();
export const useOrder = () => useContext(orderContext);

export const OrderProvider = ({
                                  children
                              }) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({});
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            refreshOrders();
            setInitialized(true);
        }
    })

    const refreshOrders = useCallback(async () => {
        try {
            setError();
            setLoading(true);
            const data = await orderApi.getAllOrders();
            setOrders(data);
            return data;
        } catch (error) {
            setError("error")
            console.error(error);
        } finally {
            setLoading(false);
        }
    });

    const createOrder = useCallback(async (order) => {
        try {
            setError();
            setLoading(true);
            const data = await orderApi.createOrder(order);
            setOrders([...orders, data]);
            return data;
        } catch (error) {
            setError("error")
            console.error(error);
        } finally {
            setLoading(false);
        }
    });

    const value = useMemo(() => ({
        orders, refreshOrders, createOrder, currentOrder, setCurrentOrder, error, loading
    }), [refreshOrders, orders, createOrder, currentOrder, error, loading]);

    return (<orderContext.Provider value={value}>{children}</orderContext.Provider>)
}