import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const PRODUCTS_KEY = 'telegram_products';



function saveProducts(products) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await api.getPosts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    }
  };

  const loadOrders = async () => {
    try {
      const data = await api.getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const addToCart = (product) => {
    if (!cart.find(item => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const placeOrder = async (user) => {
    const orderItems = [...cart];
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    try {
      // Save user
      await api.addUser(user);

      const newOrder = {
        userId: user.id,
        items: orderItems,
        total,
        status: 'В обработке',
        date: new Date().toISOString(),
      };
      await api.addOrder(newOrder);
      await loadOrders();

      // Remove ordered products from list
      for (const item of orderItems) {
        try {
          await api.deletePost(item.id);
          setProducts(products.filter(p => p.id !== item.id));
        } catch (error) {
          console.error('Error deleting post:', item.id, error);
          // Remove locally
          setProducts(products.filter(p => p.id !== item.id));
        }
      }
      await loadProducts();

    } catch (error) {
      console.error('Error placing order:', error);
      // Still remove products locally
      for (const item of orderItems) {
        setProducts(products.filter(p => p.id !== item.id));
      }
    }

    setCart([]);

    // Send notification to admin (placeholder - implement with Telegram Bot API)
    alert(`Заказ оформлен! Админ уведомлен.`);
  };

  const updateOrderStatus = (orderId, status) => {
    api.updateOrder(orderId, { status }).then(() => {
      loadOrders();
    }).catch(error => {
      console.error('Error updating order:', error);
    });
  };

  const addProduct = async (product) => {
    const newProduct = { ...product, id: Date.now().toString() };
    try {
      await api.addPost(newProduct);
      await loadProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
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