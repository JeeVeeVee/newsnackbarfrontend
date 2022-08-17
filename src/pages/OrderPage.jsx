import NavBar from "../components/core/NavBar";

import OrderHeader from "../components/order/OrderHeader";
import {useParams} from "react-router-dom";
import {useOrder} from "../context/OrderProvider";
import {useEffect, useState} from "react";
import OrderOverView from "../components/order/OrderOverView";
import AddToOrderForm from "../components/order/AddToOrderForm";

const OrderPage = () => {

    return (<>
        <NavBar/>
        <OrderHeader/>
        <AddToOrderForm/>
        <OrderOverView/>
    </>);
}

export default OrderPage;