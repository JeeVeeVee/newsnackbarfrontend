import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import RestosPage from "./pages/RestoPage";
import MenuPage from "./pages/MenuPage";
import NewOrderPage from "./pages/NewOrderPage";
import OrdersPage from "./pages/OrdersPage";
import OrderPage from "./pages/OrderPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/snackbars" exact element={<RestosPage/>}/>
                <Route path="/snackbars/:id" element={<MenuPage/>}/>
                <Route path="/new-order" element={<NewOrderPage/>}/>
                <Route path="/orders/" element={<OrdersPage/>}/>"
                <Route path={`/orders/:id`} element={<OrderPage/>}/>
            </Routes>
        </Router>);
}

export default App;
