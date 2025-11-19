import React from "react";
import recipes from "../data/recipes.json";
import { Link } from "react-router-dom";

const categories = ["Vegetariskt"];

function Categories() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Kategorier</h2>
      {categories.map(cat => (
        <div key={cat} className="mb-5">
          <h3 className="mb-3">{cat}</h3>
          <div className="row">
            {recipes
              .filter(r => r.categories.includes(cat))
              .map(r => (
                <div key={r._id} className="col-md-3 mb-3 text-center">
                  <Link to={`/recept/${r._id}`} className="text-decoration-none">
                    <img
                      src={r.imageUrl}
                      alt={r.title}
                      className="img-fluid rounded mb-2"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <p className="mb-0">{r.title}</p>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Categories;