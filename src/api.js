const API_BASE = 'http://localhost:3001/api';

export const api = {
  // Posts
  async getPosts() {
    const response = await fetch(`${API_BASE}/posts`);
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
    const response = await fetch(`${API_BASE}/users`);
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
    const response = await fetch(`${API_BASE}/users/${id}`);
    if (response.ok) {
      return response.json();
    }
    return null;
  },

  // Orders
  async getOrders() {
    const response = await fetch(`${API_BASE}/orders`);
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
    const response = await fetch(`${API_BASE}/orders/user/${userId}`);
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