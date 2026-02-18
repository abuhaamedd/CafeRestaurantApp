import express from 'express';
import db from '../config/database.js';

const router = express.Router();

// Get all tables
router.get('/', (req, res) => {
  db.all('SELECT * FROM tables ORDER BY table_number', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get table by ID
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM tables WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});

// Create table
router.post('/', (req, res) => {
  const { table_number, capacity } = req.body;
  db.run(
    'INSERT INTO tables (table_number, capacity) VALUES (?, ?)',
    [table_number, capacity],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, table_number, capacity, status: 'available' });
      }
    }
  );
});

// Update table status
router.patch('/:id', (req, res) => {
  const { status } = req.body;
  db.run('UPDATE tables SET status = ? WHERE id = ?', [status, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Table updated', id: req.params.id, status });
    }
  });
});

export default router;
