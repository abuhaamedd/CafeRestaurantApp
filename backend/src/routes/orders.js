import express from 'express';
import db from '../config/database.js';

const router = express.Router();

// Get all orders
router.get('/', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get order by ID
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM orders WHERE id = ?', [req.params.id], (err, order) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!order) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      db.all('SELECT * FROM order_items WHERE order_id = ?', [req.params.id], (err, items) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ ...order, items });
        }
      });
    }
  });
});

// Create order
router.post('/', (req, res) => {
  const { table_id, items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Items are required and must be a non-empty array' });
  }

  db.run('INSERT INTO orders (table_id) VALUES (?)', [table_id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const orderId = this.lastID;
    let total = 0;
    let itemsAdded = 0;
    let insertError = false;

    items.forEach(item => {
      const subtotal = item.quantity * item.price;
      total += subtotal;
      db.run(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.menu_item_id, item.quantity, item.price, subtotal],
        function(err) {
          if (err && !insertError) {
            insertError = true;
            return res.status(500).json({ error: err.message });
          }
          itemsAdded++;
          if (itemsAdded === items.length && !insertError) {
            db.run('UPDATE orders SET total_amount = ? WHERE id = ?', [total, orderId], function(err) {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
              res.json({ id: orderId, table_id, status: 'pending', total_amount: total });
            });
          }
        }
      );
    });
  });
});

// Update order status
router.patch('/:id', (req, res) => {
  const { status } = req.body;
  db.run('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Order updated', id: req.params.id, status });
    }
  });
});

export default router;
