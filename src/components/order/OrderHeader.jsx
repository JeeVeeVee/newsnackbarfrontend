import * as React from 'react';
import {Container} from "@mui/material";
import {useSnackbar} from "../../context/SnackbarProvider";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useOrder} from "../../context/OrderProvider";
import {useAuth} from "../../context/AuthProvider";
import Typography from "@mui/material/Typography";


export default function OrderHeader() {
    const orderId = useParams().id;
    const {ready} = useAuth();
    const {getOrderById} = useOrder();
    const {getSnackbarById} = useSnackbar();
    const [currentOrder, setCurrentOrder] = useState({});
    const [currentSnackbar, setCurrentSnackbar] = useState({naam: ""});


    const fetchOrder = async () => {
        const order = await getOrderById(orderId);
        setCurrentOrder(order.data[0]);
    }

    const fetchSnackbar = async () => {
        const snackbar = await getSnackbarById(currentOrder.snackbar_id);
        setCurrentSnackbar(snackbar[0]);
    }

    useEffect(() => {
        fetchOrder();
    }, [ready, orderId, getOrderById]);

    useEffect(() => {
        fetchSnackbar();
    }, [ready, currentOrder.snackbar_id, getOrderById]);

    if (currentOrder && currentSnackbar){
        return (<>.
            <div className={"mx-3"}>
                <Typography variant="h2" gutterBottom>
                    {currentOrder.order_naam}
                </Typography>
                <p>This orders is due for {currentOrder.date},and created  by {currentOrder.created_by}.</p>
                <p>You can pick any snacks from {currentSnackbar.naam}</p>
            </div>
        </>);
    }
    return (<>.
            <div className={"mx-3"}>
            </div>
        </>);
}
