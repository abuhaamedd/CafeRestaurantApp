import React from 'react';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>☕ MonCafé</h1>
      </div>
      <div className="navbar-nav">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/orders" className="nav-link">Commandes</Link>
        <Link to="/tables" className="nav-link">Tables</Link>
        <Link to="/menu" className="nav-link">Menu</Link>
        <Link to="/inventory" className="nav-link">Inventaire</Link>
        <Link to="/payments" className="nav-link">Paiements</Link>
      </div>
    </nav>
  );
}

export default Navbar;
