import React, { useState, useEffect } from 'react';
import { getAllMenuItems, getCategories } from '../api/client';
import '../styles/menu.css';

function Menu() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const [itemsResponse, categoriesResponse] = await Promise.all([
        getAllMenuItems(),
        getCategories()
      ]);
      setItems(itemsResponse.data);
      setCategories(categoriesResponse.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement du menu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory 
    ? items.filter(item => item.category_id === selectedCategory)
    : items;

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h2>Menu</h2>
      
      <div className="category-filter">
        <button 
          className={`category-btn ${!selectedCategory ? 'active' : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          Tous
        </button>
        {categories.map(category => (
          <button 
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredItems.length === 0 && <p>Aucun article dans le menu.</p>}
        {filteredItems.map(item => (
          <div key={item.id} className="menu-card">
            {item.image_url && <img src={item.image_url} alt={item.name} className="menu-image" />}
            <div className="menu-content">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <div className="menu-footer">
                <span className="price">{(item.price || 0).toFixed(2)} DH</span>
                <button className="btn btn-primary">Ajouter</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
