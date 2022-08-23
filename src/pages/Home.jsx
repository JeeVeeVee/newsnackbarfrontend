import NavBar from "../components/core/NavBar";
import {Container, Typography} from "@mui/material";
import LoginButton from "../components/auth0/Login";
import {useAuth0} from "@auth0/auth0-react";

const HomePage = () => {
    const {isLoading, isAuthenticated} = useAuth0();
    if (!isLoading) {
        return (<>
            <NavBar/>
            <Container>
                <Typography variant="h2" gutterBottom>
                    Welcome in the snackbar
                </Typography>
                <p>Here you can organize group orders from your favorite snackbars.</p>
                <p>Have a look at which snackbars are currently available by clicking on the menu tab.</p>
                <p>An overview of your past and current orders can be found under the "YOUR ORDERS" tab.</p>
                <p>A new order can be created by clicking (you guessed it) on the "NEW ORDER" tab.</p>
                <p></p>
                <p>Currently, {/*{snackbars.data.length}*/} snackbars and their snacks are available</p>
                {isAuthenticated ? <></> : <LoginButton classname={"mx-auto"}/>}
            </Container>
        </>)
    }
    return <></>
}

export default HomePage;