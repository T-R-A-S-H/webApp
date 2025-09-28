import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../db';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const PRODUCTS_KEY = 'telegram_products';

function getProducts() {
    const products = localStorage.getItem(PRODUCTS_KEY);
    if (!products) {
        return [
            {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые', photos: ['https://via.placeholder.com/300x300/0000FF/FFFFFF?text=Jeans+1', 'https://via.placeholder.com/300x300/0000FF/FFFFFF?text=Jeans+2', 'https://via.placeholder.com/300x300/0000FF/FFFFFF?text=Jeans+3'], condition: 8.5, size: 'M'},
            {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая', photos: ['https://via.placeholder.com/300x300/00FF00/000000?text=Jacket+1', 'https://via.placeholder.com/300x300/00FF00/000000?text=Jacket+2'], condition: 9.0, size: 'L'},
            {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые', photos: ['https://via.placeholder.com/300x300/0000FF/FFFFFF?text=Jeans2+1', 'https://via.placeholder.com/300x300/0000FF/FFFFFF?text=Jeans2+2'], condition: 7.2, size: 'S'},
            {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая', photos: ['https://via.placeholder.com/300x300/00FF00/000000?text=Jacket8'], condition: 6.8, size: 'XL'},
            {id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые', photos: ['https://via.placeholder.com/300x300/0000FF/FFFFFF?text=Jeans3+1', 'https://via.placeholder.com/300x300/0000FF/FFFFFF?text=Jeans3+2', 'https://via.placeholder.com/300x300/0000FF/FFFFFF?text=Jeans3+3'], condition: 8.9, size: 'M'},
            {id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая', photos: ['https://via.placeholder.com/300x300/00FF00/000000?text=Jacket7+1', 'https://via.placeholder.com/300x300/00FF00/000000?text=Jacket7+2'], condition: 5.5, size: 'M'},
            {id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые', photos: ['https://via.placeholder.com/300x300/0000FF/FFFFFF?text=Jeans4'], condition: 9.2, size: 'L'},
            {id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', photos: ['https://via.placeholder.com/300x300/00FF00/000000?text=Jacket5+1', 'https://via.placeholder.com/300x300/00FF00/000000?text=Jacket5+2', 'https://via.placeholder.com/300x300/00FF00/000000?text=Jacket5+3'], condition: 7.7, size: 'S'},
        ];
    }
    return JSON.parse(products);
}

function saveProducts(products) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(db.getProducts());
  const [orders, setOrders] = useState(db.getOrders());

  useEffect(() => {
    db.saveProducts(products);
  }, [products]);

  useEffect(() => {
    db.saveOrders(orders);
  }, [orders]);

  const addToCart = (product) => {
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const placeOrder = (user) => {
    // Save user to DB
    db.addUser(user);

    const newOrder = {
      id: Date.now().toString(),
      userId: user.id,
      items: cart,
      total: cart.reduce((acc, item) => acc + item.price, 0),
      status: 'В обработке',
      date: new Date().toISOString(),
    };
    db.addOrder(newOrder);
    setOrders(db.getOrders());

    setCart([]);

    alert(`Заказ оформлен! Админ уведомлен.`);
  };

  const updateOrderStatus = (orderId, status) => {
    db.updateOrder(orderId, { status });
    setOrders(db.getOrders());
  };

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts([...products, newProduct]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      products,
      orders,
      addToCart,
      removeFromCart,
      placeOrder,
      updateOrderStatus,
      addProduct
    }}>
      {children}
    </CartContext.Provider>
  );
};