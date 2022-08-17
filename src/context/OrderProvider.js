import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

import * as orderApi from '../api/order';
import {useAuth} from "./AuthProvider";

export const orderContext = createContext();
export const useOrder = () => useContext(orderContext);

export const OrderProvider = ({
                                  children
                              }) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({order_name : "", date : "", createdBy : ""});
    const [initialized, setInitialized] = useState(false);

    const {ready} = useAuth();



    const refreshOrders = useCallback(async () => {
        console.log("refreshOrders");
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
    }, []);

    useEffect(() => {
        if (!initialized && ready) {
            refreshOrders();
            setInitialized(true);
        }
    }, [refreshOrders, initialized, ready]);

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
    }, [orders]);

    const getOrderById = useCallback(async (id) => {
        if(ready){
            try {
                setError();
                setLoading(true);
                const data = await orderApi.getOrderById(id);
                setCurrentOrder(data);
                return data;
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        else{
            return {order : ""}
        }
    }, [ready]);

    const value = useMemo(() => ({
        orders, refreshOrders, createOrder, currentOrder, setCurrentOrder, error, loading, getOrderById
    }), [refreshOrders, orders, createOrder, currentOrder, error, loading]);

    return (<orderContext.Provider value={value}>{children}</orderContext.Provider>)
}