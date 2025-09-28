import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes, NavLink} from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";
import Find from "./components/Find/Find";
import Tracking from "./components/Tracking/Tracking";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import {CartProvider} from "./context/CartContext";

function App() {
    const {tg, isAdmin} = useTelegram();

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
                    {isAdmin() && <Route path="/admin" element={<AdminPanel />} />}
                </Routes>
                <nav className="bottom-nav">
                    <NavLink to="/" className="nav-link">Посты</NavLink>
                    <NavLink to="/cart" className="nav-link">Заказать</NavLink>
                    <NavLink to="/find" className="nav-link">Найти вещь</NavLink>
                    <NavLink to="/tracking" className="nav-link">Отслеживание</NavLink>
                    {isAdmin() && <NavLink to="/admin" className="nav-link">Админ</NavLink>}
                </nav>
            </div>
        </CartProvider>
    );
}

export default App;
