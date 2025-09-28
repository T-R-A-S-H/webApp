import React from 'react';
import {useCart} from "../../context/CartContext";
import {useTelegram} from "../../hooks/useTelegram";
import Button from "../Button/Button";
import './Cart.css';

const Cart = () => {
    const {cart, removeFromCart, placeOrder} = useCart();
    const {user, addAdmin} = useTelegram();

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    const onOrder = () => {
        placeOrder(user);
        alert('Заказ оформлен!');
    };

    return (
        <div className="cart">
            <h2>Корзина</h2>
            {cart.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <>
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-info">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p>Цена: {item.price} руб.</p>
                            </div>
                            <Button onClick={() => removeFromCart(item.id)}>Удалить</Button>
                        </div>
                    ))}
                    <div className="total">Итого: {totalPrice} руб.</div>
                    <Button onClick={onOrder}>Заказать</Button>
                </>
            )}
        </div>
    );
};

export default Cart;