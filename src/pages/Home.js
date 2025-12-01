import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../api";
import RecipeFilter from "../components/RecipeFilter";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = !selectedCategory || recipe.categories.includes(selectedCategory);
    const matchesSearch = !searchTerm || (recipe.title?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mt-4">
      <div className="container">
        <h1 className="mb-4 text-center">Indiska Julrecept!</h1>
        <p className="mb-4 text-center">
          Upptäck Traditionella Indiska Julrecept!
        </p>
        <br></br>
        <br></br>
        <RecipeFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <div className="recipe-grid">
        {filteredRecipes.map(recipe => (
          <div key={recipe._id} className="recipe-card">
            <Link to={`/recept/${recipe._id}`} className="text-decoration-none">
              <div className="card h-100">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  
                  <p className="card-text">{recipe.description}</p>
                  <p className="card-text"><strong>Kategori:</strong> {recipe.categories}</p>
                  <p className="card-text"><strong>Tid:</strong> {recipe.timeInMins} min</p>
                  <p className="card-text"><strong>Betyg:</strong> {recipe.avgRating || 'N/A'} / 5</p>
                  <h6>Ingredienser:</h6>
                  <ul className="list-unstyled">
                    {recipe.ingredients.slice(0, 3).map((ing, idx) => (
                      <li key={idx}>{ing.amount} {ing.unit} {ing.name}</li>
                    ))}
                    {recipe.ingredients.length > 3 && <li>...</li>}
                  </ul>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;