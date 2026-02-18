import React, { useState, useEffect } from 'react';
import { getPayments } from '../api/client';
import '../styles/payments.css';

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await getPayments();
      setPayments(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des paiements');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h2>Paiements</h2>
      
      <div className="payment-summary">
        <div className="summary-card">
          <h3>Revenu Total</h3>
          <p className="amount">{totalRevenue.toFixed(2)} DH</p>
        </div>
        <div className="summary-card">
          <h3>Nombre de Paiements</h3>
          <p className="amount">{payments.length}</p>
        </div>
      </div>

      <table className="payments-table">
        <thead>
          <tr>
            <th>ID Commande</th>
            <th>Montant</th>
            <th>Méthode</th>
            <th>Statut</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td>#{payment.order_id}</td>
              <td className="amount">{payment.amount.toFixed(2)} DH</td>
              <td>{payment.payment_method || '-'}</td>
              <td><span className="status-paid">{payment.status}</span></td>
              <td>{new Date(payment.created_at).toLocaleString('fr-FR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payments;
