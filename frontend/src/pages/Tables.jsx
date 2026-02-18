import React, { useState, useEffect } from 'react';
import { getTables } from '../api/client';
import '../styles/tables.css';

function Tables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await getTables();
      setTables(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des tables');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return '#28a745';
      case 'occupied': return '#dc3545';
      case 'reserved': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      'available': 'Disponible',
      'occupied': 'Occupée',
      'reserved': 'Réservée'
    };
    return labels[status] || status;
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h2>Gestion des Tables</h2>
      <div className="tables-grid">
        {tables.length === 0 && <p>Aucune table configurée.</p>}
        {tables.map(table => (
          <div key={table.id} className="table-card" style={{ borderLeft: `4px solid ${getStatusColor(table.status)}` }}>
            <h3>Table {table.table_number}</h3>
            <p><strong>Capacité:</strong> {table.capacity} personnes</p>
            <p><strong>Statut:</strong> <span className="status-badge" style={{ backgroundColor: getStatusColor(table.status) }}>{getStatusLabel(table.status)}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tables;
