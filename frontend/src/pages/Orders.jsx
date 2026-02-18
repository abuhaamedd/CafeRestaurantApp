import React, { useState, useEffect } from 'react';
import { getOrders } from '../api/client';
import '../styles/orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des commandes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ffc107';
      case 'completed': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      'pending': 'En attente',
      'completed': 'Complétée',
      'cancelled': 'Annulée'
    };
    return labels[status] || status;
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h2>Gestion des Commandes</h2>
      <div className="orders-list">
        {orders.length === 0 && <p>Aucune commande pour le moment.</p>}
        {orders.map(order => (
          <div key={order.id} className="order-item">
            <div className="order-header">
              <h3>Commande #{order.id}</h3>
              <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                {getStatusLabel(order.status)}
              </span>
            </div>
            <div className="order-details">
              <p><strong>Table:</strong> {order.table_id}</p>
              <p><strong>Total:</strong> {order.total_amount ? order.total_amount.toFixed(2) : '0.00'} DH</p>
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString('fr-FR')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
