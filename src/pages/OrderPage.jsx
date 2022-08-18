import NavBar from "../components/core/NavBar";

import OrderHeader from "../components/order/OrderHeader";
import {useParams} from "react-router-dom";
import {useOrder} from "../context/OrderProvider";
import {useEffect, useState} from "react";
import OrderOverView from "../components/order/OrderOverView";
import AddToOrderForm from "../components/order/AddToOrderForm";
import {useAuth} from "../context/AuthProvider";
import {useSnackbar} from "../context/SnackbarProvider";

const OrderPage = () => {
    const orderId = useParams().id;
    const {setCurrentOrderId, currentOrder} = useOrder();
    const {getSnackbarById} = useSnackbar();
    //const [currentOrder, setCurrentOrder] = useState({});
    const [currentSnackbar, setCurrentSnackbar] = useState({naam: ""});

    useEffect(() => {
        setCurrentOrderId(orderId);
    }, [orderId]);

    return (<>
        <NavBar/>
        <OrderHeader/>
        <AddToOrderForm/>
        <OrderOverView/>
    </>);
}

export default OrderPage;