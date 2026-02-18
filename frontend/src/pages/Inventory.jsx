import React, { useState, useEffect } from 'react';
import { getInventory } from '../api/client';
import '../styles/inventory.css';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await getInventory();
      setInventory(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement du stock');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStockStatus = (quantity, minStock) => {
    if (!minStock) return 'normal';
    return quantity <= minStock ? 'low' : 'normal';
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h2>Inventaire</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Article</th>
            <th>Quantité</th>
            <th>Unité</th>
            <th>Stock minimum</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id} className={getStockStatus(item.quantity, item.min_stock)}>
              <td>{item.item_name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
              <td>{item.min_stock || '-'}</td>
              <td>
                <span className={`status ${getStockStatus(item.quantity, item.min_stock)}`}>
                  {getStockStatus(item.quantity, item.min_stock) === 'low' ? '⚠️ Stock faible' : '✓ Normal'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
