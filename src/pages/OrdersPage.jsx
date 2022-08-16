import NavBar from "../components/core/NavBar";
import {Container} from "@mui/material";
import OrdersTable from "../components/orders/OrdersTable";

const OrdersPage = () => {
    return (<>
        <NavBar/>
        <Container>
            <OrdersTable />
        </Container>
    </>)
}

export default OrdersPage;