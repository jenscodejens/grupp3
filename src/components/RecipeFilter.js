import React, { useState } from 'react';
import './RecipeFilter.css';

const categories = ["Vegetariskt", "Kött", "Fisk", "Kyckling", "Dessert"];

function RecipeFilter({ selectedCategory, onCategoryChange, searchTerm, onSearchChange }) {
  const handleCategoryClick = (cat) => {
    onCategoryChange(selectedCategory === cat ? null : cat);
  };

  return (
    <div className="recipe-filter">
      <div className="d-flex justify-content-between align-items-center">
        <div className="btn-group" role="group">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-light'}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="input-group" style={{ maxWidth: '300px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Sök recept..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button className="btn btn-primary" type="button" style={{ width: '65px' }}>
            Sök
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeFilter;