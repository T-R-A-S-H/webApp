// Simple database using localStorage

const USERS_KEY = 'telegram_users';
const ORDERS_KEY = 'telegram_orders';

export const db = {
  // Users
  getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  addUser(user) {
    const users = this.getUsers();
    const existingUser = users.find(u => u.id === user.id);
    if (!existingUser) {
      users.push(user);
      this.saveUsers(users);
    }
  },

  getUserById(id) {
    const users = this.getUsers();
    return users.find(u => u.id === id);
  },

  updateUser(id, updates) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      this.saveUsers(users);
    }
  },

  // Orders
  getOrders() {
    const orders = localStorage.getItem(ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
  },

  saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },

  addOrder(order) {
    const orders = this.getOrders();
    orders.push(order);
    this.saveOrders(orders);
    return order.id;
  },

  getOrderById(id) {
    const orders = this.getOrders();
    return orders.find(o => o.id === id);
  },

  updateOrder(id, updates) {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updates };
      this.saveOrders(orders);
    }
  },

  getOrdersByUserId(userId) {
    const orders = this.getOrders();
    return orders.filter(o => o.userId === userId);
  },

  deleteOrder(id) {
    const orders = this.getOrders();
    const filtered = orders.filter(o => o.id !== id);
    this.saveOrders(filtered);
  }
};