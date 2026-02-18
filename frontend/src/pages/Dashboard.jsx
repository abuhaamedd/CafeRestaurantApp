import React, { useState, useEffect } from 'react';
import { getTables, getOrders, getPayments } from '../api/client';
import '../styles/dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalTables: 0,
    occupiedTables: 0,
    pendingOrders: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [tablesRes, ordersRes, paymentsRes] = await Promise.all([
        getTables(),
        getOrders(),
        getPayments()
      ]);

      const tables = tablesRes.data;
      const orders = ordersRes.data;
      const payments = paymentsRes.data;

      setStats({
        totalTables: tables.length,
        occupiedTables: tables.filter(t => t.status === 'occupied').length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0)
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Chargement du tableau de bord...</div>;

  return (
    <div className="container">
      <h2>Tableau de Bord</h2>
      
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalTables}</div>
          <div className="stat-label">Tables Totales</div>
          <div className="stat-detail">{stats.occupiedTables} occupées</div>
        </div>

        <div className="stat-card">
          <div className="stat-value" style={{ color: '#ff9800' }}>{stats.pendingOrders}</div>
          <div className="stat-label">Commandes en attente</div>
        </div>

        <div className="stat-card">
          <div className="stat-value" style={{ color: '#28a745' }}>{stats.totalRevenue.toFixed(2)} DH</div>
          <div className="stat-label">Revenu Total</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">100%</div>
          <div className="stat-label">Performance</div>
          <div className="stat-detail">Système opérationnel</div>
        </div>
      </div>

      <div className="welcome-section">
        <h3>👋 Bienvenue à MonCafé</h3>
        <p>Utilisez le menu de navigation pour accéder à:</p>
        <ul>
          <li><strong>Commandes:</strong> Gérer toutes les commandes en cours</li>
          <li><strong>Tables:</strong> Visualiser l'état de toutes les tables</li>
          <li><strong>Menu:</strong> Consulter et gérer le menu</li>
          <li><strong>Inventaire:</strong> Suivi du stock</li>
          <li><strong>Paiements:</strong> Historique des transactions</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
