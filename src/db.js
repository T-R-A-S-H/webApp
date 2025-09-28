// Simple database using localStorage

const USERS_KEY = 'telegram_users';
const ORDERS_KEY = 'telegram_orders';
const ADMINS_KEY = 'telegram_admins';

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

  // Admins
  getAdmins() {
    const admins = localStorage.getItem(ADMINS_KEY);
    if (!admins) {
      const initialAdmins = [{ username: '@mama_brik', permissions: { canAddProducts: true, canAddAdmins: true, canManageOrders: true } }];
      localStorage.setItem(ADMINS_KEY, JSON.stringify(initialAdmins));
      return initialAdmins;
    }
    return JSON.parse(admins);
  },

  saveAdmins(admins) {
    localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
  },

  addAdmin(username, permissions = { canAddProducts: true, canAddAdmins: false, canManageOrders: false }) {
    const admins = this.getAdmins();
    const existingAdmin = admins.find(a => a.username === username);
    if (!existingAdmin) {
      admins.push({ username, permissions });
      this.saveAdmins(admins);
    }
  },

  updateAdminPermissions(username, permissions) {
    const admins = this.getAdmins();
    const index = admins.findIndex(a => a.username === username);
    if (index !== -1) {
      admins[index].permissions = { ...admins[index].permissions, ...permissions };
      this.saveAdmins(admins);
    }
  },

  removeAdmin(username) {
    const admins = this.getAdmins();
    const filtered = admins.filter(a => a.username !== username);
    this.saveAdmins(filtered);
  },

  getAdminPermissions(username) {
    const admins = this.getAdmins();
    const admin = admins.find(a => a.username === username);
    return admin ? admin.permissions : null;
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