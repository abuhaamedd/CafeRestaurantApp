import express from 'express';
import db from '../config/database.js';

const router = express.Router();

// Get all payments
router.get('/', (req, res) => {
  db.all('SELECT * FROM payments', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Record payment
router.post('/', (req, res) => {
  const { order_id, amount, payment_method } = req.body;
  db.run(
    'INSERT INTO payments (order_id, amount, payment_method) VALUES (?, ?, ?)',
    [order_id, amount, payment_method],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // Update order status
        db.run('UPDATE orders SET status = ? WHERE id = ?', ['completed', order_id]);
        res.json({ id: this.lastID, order_id, amount, payment_method, status: 'paid' });
      }
    }
  );
});

export default router;
