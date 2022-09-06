import NavBar from "../components/core/NavBar";
import SnackTable from "../components/snacks/SnackTable";
import {useAuth0} from "@auth0/auth0-react";
import {Container} from "@mui/material";
import LoginButton from "../components/auth0/Login";

const RestosPage = () => {
    const {isLoading, isAuthenticated} = useAuth0();

    if (!isLoading) {
        return (<>
            <NavBar/>
            {isAuthenticated ? <SnackTable/> : <Container>
                <p>je bent nog niet ingelogd, log je in om de beschikbare snackbars te zien</p>
                <LoginButton/>
            </Container>}
        </>)
    }
    return <></>

}

export default RestosPage;
