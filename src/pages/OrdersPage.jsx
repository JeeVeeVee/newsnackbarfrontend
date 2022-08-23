import NavBar from "../components/core/NavBar";
import {Container} from "@mui/material";
import OrdersTable from "../components/orders/OrdersTable";
import LoginButton from "../components/auth0/Login";
import {useAuth0} from "@auth0/auth0-react";

const OrdersPage = () => {
    const {isLoading, isAuthenticated} = useAuth0();

    if (!isLoading) {
        return (<>
            <NavBar/>
            <Container>
                {isAuthenticated ? <OrdersTable/> :
                    <div>
                        <p>je bent nog niet ingelogd, log je in om je bestellingen te zien</p>
                        <LoginButton/>
                    </div>
                }
            </Container>
        </>)
    }
    return (<>
    </>)
}

export default OrdersPage;