import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../api";

const categories = ["Vegetariskt", "Kött", "Fisk", "Kyckling", "Dessert"];

function Categories() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecipes();
        setRecipes(response.data);
      } catch (err) {
        setError('Failed to load recipes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <div className="container mt-4"><p>Loading recipes...</p></div>;
  if (error) return <div className="container mt-4"><p>{error}</p></div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Kategorier</h2>
      {categories.map(cat => (
        <div key={cat} className="mb-5">
          <h3 className="mb-3">{cat}</h3>
          <div className="row">
            {recipes
              .filter(r => r.categories === cat)
              .map(r => (
                <div key={r._id} className="col-md-3 mb-3 text-center">
                  <Link to={`/recept/${r._id}`} className="text-decoration-none">
                    <img
                      src={r.imageUrl}
                      alt={r.title}
                      className="img-fluid rounded mb-2"
                      style={{ height: '200px', objectFit: 'cover' }}
                      onError={(e) => e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'}
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