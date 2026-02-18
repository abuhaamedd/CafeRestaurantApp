import express from 'express';
import db from '../config/database.js';

const router = express.Router();

// Get all categories
router.get('/categories', (req, res) => {
  db.all('SELECT * FROM categories', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Add category
router.post('/categories', (req, res) => {
  const { name, description } = req.body;
  db.run(
    'INSERT INTO categories (name, description) VALUES (?, ?)',
    [name, description],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, name, description });
      }
    }
  );
});

// Get all menu items (must be before /items/:categoryId to avoid route conflict)
router.get('/items', (req, res) => {
  db.all('SELECT * FROM menu_items WHERE is_available = 1', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get menu items by category
router.get('/items/:categoryId', (req, res) => {
  db.all('SELECT * FROM menu_items WHERE category_id = ? AND is_available = 1', [req.params.categoryId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Add menu item
router.post('/items', (req, res) => {
  const { name, description, category_id, price, image_url } = req.body;
  db.run(
    'INSERT INTO menu_items (name, description, category_id, price, image_url) VALUES (?, ?, ?, ?, ?)',
    [name, description, category_id, price, image_url],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, name, description, category_id, price, image_url });
      }
    }
  );
});

export default router;
