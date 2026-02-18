import express from 'express';
import db from '../config/database.js';

const router = express.Router();

// Get all inventory items
router.get('/', (req, res) => {
  db.all('SELECT * FROM inventory', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Add inventory item
router.post('/', (req, res) => {
  const { item_name, quantity, unit, min_stock } = req.body;
  db.run(
    'INSERT INTO inventory (item_name, quantity, unit, min_stock) VALUES (?, ?, ?, ?)',
    [item_name, quantity, unit, min_stock],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, item_name, quantity, unit, min_stock });
      }
    }
  );
});

// Update inventory
router.patch('/:id', (req, res) => {
  const { quantity } = req.body;
  db.run(
    'UPDATE inventory SET quantity = ?, last_updated = CURRENT_TIMESTAMP WHERE id = ?',
    [quantity, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Inventory updated', id: req.params.id });
      }
    }
  );
});

export default router;
