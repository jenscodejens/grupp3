import React, { useState } from 'react';
import './RecipeFilter.css';

const categories = ["Vegetariskt", "Kött", "Fisk", "Kyckling", "Dessert"];

function RecipeFilter({ selectedCategory, onCategoryChange, searchTerm, onSearchChange }) {
  const handleCategoryClick = (cat) => {
    onCategoryChange(selectedCategory === cat ? null : cat);
  };

  return (
    <div className="recipe-filter">
      <div className="row g-2 align-items-center">
        <div className="col-md-8 col-12">
          <div className="d-flex flex-wrap gap-2">
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
        </div>
        <div className="col-md-4 col-12">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Sök recept..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button className="btn btn-primary" type="button">
              Sök
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeFilter;