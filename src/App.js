import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom';
import Home from "./pages/Home";
import RestosPage from "./pages/RestoPage";
import MenuPage from "./pages/MenuPage";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";

function App() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [state, setState] = useState({
        showResult: false,
        apiMessage: "",
        error: null,
    });



    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "el-jeeveevee.eu.auth0.com";

            try {
                const accessToken = await getAccessTokenSilently();
                console.log(accessToken)
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently]);
  return (

    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/snackbars" exact element={<RestosPage/>}/>
          <Route path="/snackbars/:id" element={<MenuPage/>}/>
        </Routes>
    </Router>
  );
}

export default App;
