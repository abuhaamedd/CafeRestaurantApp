import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATABASE_PATH = process.env.DATABASE_PATH || join(__dirname, '../../data/cafe.db');

// Ensure the data directory exists
const dataDir = dirname(DATABASE_PATH);
mkdirSync(dataDir, { recursive: true });

const db = new sqlite3.Database(DATABASE_PATH, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database at:', DATABASE_PATH);
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Users/Staff
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'cashier',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Categories (Boissons, Petit déjeuner, etc.)
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Menu Items
  db.run(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      category_id INTEGER,
      price REAL NOT NULL,
      image_url TEXT,
      is_available BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);

  // Tables
  db.run(`
    CREATE TABLE IF NOT EXISTS tables (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      table_number INTEGER UNIQUE NOT NULL,
      capacity INTEGER NOT NULL,
      status TEXT DEFAULT 'available',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Orders
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      table_id INTEGER,
      status TEXT DEFAULT 'pending',
      total_amount REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME,
      FOREIGN KEY (table_id) REFERENCES tables(id)
    )
  `);

  // Order Items
  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      menu_item_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL,
      subtotal REAL NOT NULL,
      notes TEXT,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
    )
  `);

  // Inventory
  db.run(`
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_name TEXT UNIQUE NOT NULL,
      quantity REAL NOT NULL,
      unit TEXT,
      min_stock REAL,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Payments
  db.run(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER UNIQUE,
      amount REAL NOT NULL,
      payment_method TEXT,
      status TEXT DEFAULT 'paid',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(id)
    )
  `);

  console.log('Database tables initialized');
}

export default db;
