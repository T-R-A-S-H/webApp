const API_BASE = 'http://91.229.90.203/api';

export const api = {
  // Posts
  async getPosts() {
    const response = await fetch(`${API_BASE}/posts`, { mode: 'cors' });
    return response.json();
  },

  async addPost(post) {
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });
    return response.json();
  },

  async updatePost(id, updates) {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json();
  },

  async deletePost(id) {
    await fetch(`${API_BASE}/posts/${id}`, { method: 'DELETE' });
  },

  // Users
  async getUsers() {
    const response = await fetch(`${API_BASE}/users`, { mode: 'cors' });
    return response.json();
  },

  async addUser(user) {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return response.json();
  },

  async getUserById(id) {
    const response = await fetch(`${API_BASE}/users/${id}`, { mode: 'cors' });
    if (response.ok) {
      return response.json();
    }
    return null;
  },

  // Orders
  async getOrders() {
    const response = await fetch(`${API_BASE}/orders`, { mode: 'cors' });
    return response.json();
  },

  async addOrder(order) {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    return response.json();
  },

  async updateOrder(id, updates) {
    const response = await fetch(`${API_BASE}/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json();
  },

  async getOrdersByUserId(userId) {
    const response = await fetch(`${API_BASE}/orders/user/${userId}`, { mode: 'cors' });
    return response.json();
  },

  // Admins
  async getAdmins() {
    const response = await fetch(`${API_BASE}/admins`);
    return response.json();
  },

  async addAdmin(admin) {
    const response = await fetch(`${API_BASE}/admins`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(admin)
    });
    return response.json();
  },

  async updateAdmin(username, updates) {
    const response = await fetch(`${API_BASE}/admins/${username}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response.json();
  },

  async deleteAdmin(username) {
    await fetch(`${API_BASE}/admins/${username}`, { method: 'DELETE' });
  }
};
