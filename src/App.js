import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes, NavLink} from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";
import Find from "./components/Find/Find";
import Tracking from "./components/Tracking/Tracking";
import {CartProvider} from "./context/CartContext";

function App() {
    const {tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <CartProvider>
            <div className="App">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/find" element={<Find />} />
                    <Route path="/tracking" element={<Tracking />} />
                </Routes>
                <nav className="bottom-nav">
                    <NavLink to="/" className="nav-link">Посты</NavLink>
                    <NavLink to="/cart" className="nav-link">Заказать</NavLink>
                    <NavLink to="/find" className="nav-link">Найти вещь</NavLink>
                    <NavLink to="/tracking" className="nav-link">Отслеживание</NavLink>
                </nav>
            </div>
        </CartProvider>
    );
}

export default App;
