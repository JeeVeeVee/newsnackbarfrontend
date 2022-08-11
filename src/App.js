import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom';
import Home from "./pages/Home";
import RestosPage from "./pages/RestoPage";
import MenuPage from "./pages/MenuPage";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/snackbars" exact element={<RestosPage/>}/>
          <Route path="/snackbars/:id" element={<MenuPage/>}/>
        </Routes>
    </Router>
  );
}

export default App;
