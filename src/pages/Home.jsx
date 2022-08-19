import NavBar from "../components/core/NavBar";
import {Container} from "@mui/material";

const HomePage = () => {
    return (<>
        <NavBar/>
        <Container>
            <h1>Welcome in the snackbar</h1>
            <p>Here you can organize group orders from your favorite snackbars.</p>
            <p>Have a look at which snackbars are currently available by clicking on the menu tab.</p>
            <p>An overview of your past and current orders can be found under the "YOUR ORDERS" tab.</p>
            <p>A new order can be created by clicking (you guessed it) on the "NEW ORDER" tab.</p>
            <p></p>
            <p>Currently, {/*{snackbars.data.length}*/} snackbars and their snacks are available</p>
        </Container>
    </>)
}

export default HomePage;