import NewOrderForm from "../components/newOrderForm";
import NavBar from "../components/core/NavBar";
import {useAuth0} from "@auth0/auth0-react";
import LoginButton from "../components/auth0/Login";
import {Container} from "@mui/material";

const NewOrderPage = () => {
    const {isLoading, isAuthenticated} = useAuth0();

    if(! isLoading){
        return(<>
            <NavBar/>
            {isAuthenticated ? <NewOrderForm/> : <Container>
                <p>je bent nog niet ingelogd, log je in om een bestelling te maken</p>
                <LoginButton/>
            </Container>}
        </>)
    }
    return (<>
    </>)
}

export default NewOrderPage;