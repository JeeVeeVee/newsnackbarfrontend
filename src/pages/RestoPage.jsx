import NavBar from "../components/core/NavBar";
import SnackbarTable from "../components/snackbars/SnackbarTable";
import {useAuth0} from "@auth0/auth0-react";
import LoginButton from "../components/auth0/Login";
import {Container} from "@mui/material";


const RestosPage = () => {
    const {isLoading, isAuthenticated} = useAuth0();

    if (!isLoading) {
        return (<>
            <NavBar/>
            {isAuthenticated ? <SnackbarTable/> : <Container>
                <p>je bent nog niet ingelogd, log je in om de beschikbare snackbars te zien</p>
                <LoginButton></LoginButton>
            </Container>}
        </>)
    } else {
        return <>
        </>
    }
}

export default RestosPage;