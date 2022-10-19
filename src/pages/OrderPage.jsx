import NavBar from "../components/core/NavBar";

import OrderHeader from "../components/order/OrderHeader";
import {useParams} from "react-router-dom";
import {useOrder} from "../context/OrderProvider";
import {useEffect} from "react";
import OrderOverView from "../components/order/OrderOverView";
import AddToOrderForm from "../components/order/AddToOrderForm";
import {useAuth0} from "@auth0/auth0-react";
import LoginButton from "../components/auth0/Login";
import {Container} from "@mui/material";

const OrderPage = () => {
    const orderId = useParams().id;
    const {setCurrentOrderId, setCurrentOrder, getOrderById, setCurrentOrderDetails} = useOrder();
    const {isLoading, isAuthenticated} = useAuth0();


    useEffect(() => {
        setCurrentOrderId(orderId);
        const fetchOrder = async () => {
            const order = await getOrderById(orderId);
            setCurrentOrder(order);
            setCurrentOrderDetails(order);
        }
        fetchOrder();
    }, [orderId, setCurrentOrderId, setCurrentOrder, getOrderById, setCurrentOrderDetails]);

    if (!isLoading) {
        return (<>
            <NavBar/>
            {isAuthenticated ? <div>
                <OrderHeader/>
                <AddToOrderForm/>
                <OrderOverView/>
            </div> : <Container>
                <p>je bent nog niet ingelogd, log je in om de bestelling te zien</p>
                <LoginButton/>
            </Container>}

        </>)
    }
    return (<>
    </>);
}

export default OrderPage;