import NavBar from "../components/core/NavBar";

import OrderHeader from "../components/order/OrderHeader";
import {useParams} from "react-router-dom";
import {useOrder} from "../context/OrderProvider";
import {useEffect} from "react";
import OrderOverView from "../components/order/OrderOverView";
import AddToOrderForm from "../components/order/AddToOrderForm";

const OrderPage = () => {
    const orderId = useParams().id;
    const {setCurrentOrderId, setCurrentOrder, getOrderById, setCurrentOrderDetails} = useOrder();


    useEffect(() => {
        setCurrentOrderId(orderId);
        const fetchOrder = async () => {
            const order = await getOrderById(orderId);
            setCurrentOrder(order);
            setCurrentOrderDetails(order);
        }
        fetchOrder();
    } , [orderId, setCurrentOrderId, setCurrentOrder, getOrderById, setCurrentOrderDetails]);
    return (<>
        <NavBar/>
        <OrderHeader/>
        <AddToOrderForm/>
        <OrderOverView/>
    </>);
}

export default OrderPage;