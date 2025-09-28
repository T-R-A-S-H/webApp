import React from 'react';
import { useCart } from "../../context/CartContext";
import { useTelegram } from "../../hooks/useTelegram";
import './Tracking.css';

const Tracking = () => {
    const { orders } = useCart();
    const { user } = useTelegram();

    const userOrders = orders.filter(order => order.userId === user?.id);

    return (
        <div className="tracking">
            <h2>Отслеживание</h2>
            {userOrders.length === 0 ? (
                <p>У вас нет заказов</p>
            ) : (
                userOrders.map(order => (
                    <div key={order.id} className="order-tracking">
                        <h3>Заказ #{order.id}</h3>
                        <p>Дата: {new Date(order.date).toLocaleDateString()}</p>
                        <p>Сумма: {order.total} руб.</p>
                        <p>Статус: {order.status}</p>
                        <div className="order-items">
                            {order.items.map(item => (
                                <div key={item.id} className="order-item">
                                    <p>{item.title} - {item.price} руб.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Tracking;