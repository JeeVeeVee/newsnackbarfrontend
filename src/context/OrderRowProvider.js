import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useAuth} from "./AuthProvider";
import * as orderRowApi from '../api/orderRow';
import {useOrder} from "./OrderProvider";

export const orderRowContext = createContext();
export const useOrderRow = () => useContext(orderRowContext);

export const OrderRowProvider = ({
                                     children
                                 }) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [orderRows, setOrderRows] = useState([]);
    const [currentOrderRows, setCurrentOrderRows] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const {currentOrderId, currentOrder} = useOrder();

    const {ready} = useAuth();


    useEffect(() => {
        if (!initialized && ready) {
            setInitialized(true);
        }
    }, [ready]);

    const fetchCurrentOrderRows = async () => {
        let currentOrderRowsLoad = await orderRowApi.getAllOrderRowsInOrder(currentOrderId);
        setCurrentOrderRows(currentOrderRowsLoad);
    }

    useEffect(() => {
        console.log(currentOrderId);
        console.log("ik ben NU hier")
        fetchCurrentOrderRows();
    }, [currentOrderId]);

    const createOrderRow = useCallback(async (orderRow) => {
        if(ready) {
            try {
                setError();
                setLoading(true);
                const data = await orderRowApi.createOrderRow(orderRow);
                if(currentOrderId){
                    let newCurrentOrderRowsLoad = await getAllOrderRowsInOrder(currentOrderId);
                    setCurrentOrderRows(newCurrentOrderRowsLoad);
                }
                return data;
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    }, [ready]);

    const getAllOrderRowsInOrder = useCallback(async (orderID) => {
        if(ready){
            try {
                setError();
                setLoading(true);
                console.log("van hier");
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

    const deleteOrderRow = useCallback(async (id) => {
        if(ready){
            try {
                setError();
                setLoading(true);
                await orderRowApi.deleteOrderRow(id);
                fetchCurrentOrderRows();
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setLoading(false);
               // refreshCurrentOrder();
            }
        }
    }, [ready]);

    const value = useMemo(() => ({
        orderRows, createOrderRow, error, loading, getAllOrderRowsInOrder, deleteOrderRow, currentOrderRows
    }), [getAllOrderRowsInOrder, orderRows, createOrderRow, error, loading, deleteOrderRow, currentOrderRows]);

    return (<orderRowContext.Provider value={value}>{children}</orderRowContext.Provider>);
}