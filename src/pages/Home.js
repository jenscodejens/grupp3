import React from "react";
import { Link } from "react-router-dom";
import recipes from "../data/recipes.json";

function Home() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Indiska Julrecept!</h1>
      <p className="mb-4">
        Upptäck Traditionella Indiska Julrecept!
      </p>
      <div className="row">
        {recipes.map(recipe => (
          <div key={recipe._id} className="col-md-4 mb-4">
            <Link to={`/recept/${recipe._id}`} className="text-decoration-none">
              <div className="card h-100">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <p className="card-text"><strong>Kategorier:</strong> {recipe.categories.join(", ")}</p>
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