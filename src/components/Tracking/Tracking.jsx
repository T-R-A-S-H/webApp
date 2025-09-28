import React, { useState, useEffect } from 'react';
import { api } from "../../api";
import { useTelegram } from "../../hooks/useTelegram";
import './Tracking.css';

const Tracking = () => {
    const [userOrders, setUserOrders] = useState([]);
    const { user } = useTelegram();

    useEffect(() => {
        if (user?.id) {
            loadUserOrders();
        }
    }, [user]);

    const loadUserOrders = async () => {
        try {
            const orders = await api.getOrdersByUserId(user.id);
            setUserOrders(orders);
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    };

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