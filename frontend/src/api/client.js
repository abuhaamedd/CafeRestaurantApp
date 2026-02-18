import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Menu APIs
export const getCategories = () => apiClient.get('/menu/categories');
export const addCategory = (data) => apiClient.post('/menu/categories', data);
export const getMenuItems = (categoryId) => apiClient.get(`/menu/items/${categoryId}`);
export const getAllMenuItems = () => apiClient.get('/menu/items');
export const addMenuItem = (data) => apiClient.post('/menu/items', data);

// Order APIs
export const getOrders = () => apiClient.get('/orders');
export const getOrderById = (id) => apiClient.get(`/orders/${id}`);
export const createOrder = (data) => apiClient.post('/orders', data);
export const updateOrderStatus = (id, status) => apiClient.patch(`/orders/${id}`, { status });

// Table APIs
export const getTables = () => apiClient.get('/tables');
export const getTableById = (id) => apiClient.get(`/tables/${id}`);
export const createTable = (data) => apiClient.post('/tables', data);
export const updateTableStatus = (id, status) => apiClient.patch(`/tables/${id}`, { status });

// Inventory APIs
export const getInventory = () => apiClient.get('/inventory');
export const addInventoryItem = (data) => apiClient.post('/inventory', data);
export const updateInventory = (id, quantity) => apiClient.patch(`/inventory/${id}`, { quantity });

// Payment APIs
export const getPayments = () => apiClient.get('/payments');
export const recordPayment = (data) => apiClient.post('/payments', data);

export default apiClient;
