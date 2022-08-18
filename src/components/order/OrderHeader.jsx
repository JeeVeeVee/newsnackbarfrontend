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
    const {currentOrder, loading} = useOrder();
    const {getSnackbarById} = useSnackbar();
    const [currentSnackbar, setCurrentSnackbar] = useState({naam: ""});

    const fetchSnackbar = async () => {
        if(currentOrder && currentOrder.data) {
            const snackbar = await getSnackbarById(currentOrder.data[0].snackbar_id);
            setCurrentSnackbar(snackbar[0]);
        }
    }

    useEffect(() => {
        fetchSnackbar();
    }, [ready, currentOrder.snackbar_id]);


    if (! loading && currentOrder && currentOrder.data && currentOrder.data[0]) {
        console.log(currentOrder.data[0].order_id);
        return (<>.
            <div className={"mx-3"}>
                <Typography variant="h2" gutterBottom>
                    {currentOrder.data[0].order_naam}
                </Typography>
                <p>This orders is due for {currentOrder.data[0].date},and created  by {currentOrder.data[0].created_by}.</p>
                <p>You can pick any snacks from {currentSnackbar.naam}</p>
            </div>
        </>);
    }
    return (<>
            fak
        </>
    );
}
