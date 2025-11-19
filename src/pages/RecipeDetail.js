import React, { useState } from "react";
import { useParams } from "react-router-dom";
import recipes from "../data/recipes.json";

function RecipeDetail({ recipe: propRecipe }) {
  const { id } = useParams();
  const recipe = propRecipe || recipes.find(r => r._id === id);

  const [rating, setRating] = useState(recipe?.avgRating || 0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState(recipe?.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleRate = (rate) => {
    setUserRating(rate);
    setRating((rating + rate) / 2);
    alert("Tack för din röst!");
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment('');
      alert("Kommentar tillagd!");
    }
  };

  if (!recipe) return <div className="container mt-4"><p>Receptet hittades inte.</p></div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{recipe.title}</h2>
      <p className="mb-3">{recipe.description}</p>
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="img-fluid rounded mb-3"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <p className="mb-2"><strong>Kategorier:</strong> {recipe.categories.join(", ")}</p>
      <p className="mb-2"><strong>Tid:</strong> {recipe.timeInMins} min</p>
      <p className="mb-4"><strong>Betyg:</strong> {rating.toFixed(1)} / 5</p>
      <h4 className="mt-4 mb-3">Ingredienser:</h4>
      <ul className="list-group mb-3">
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx} className="list-group-item">{ing.amount} {ing.unit} {ing.name}</li>
        ))}
      </ul>
      <h4 className="mt-4 mb-3">Steg:</h4>
      <ol className="list-group list-group-numbered mb-4">
        {recipe.instructions.map((step, idx) => (
          <li key={idx} className="list-group-item">{step}</li>
        ))}
      </ol>
      <div className="mt-4">
        <label className="form-label">
          Ge betyg (1-5):
        </label>
        <div className="mb-2">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              style={{
                fontSize: '24px',
                cursor: 'pointer',
                color: star <= (hoverRating || userRating) ? '#ffc107' : '#ddd'
              }}
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h5>Kommentarer:</h5>
        <ul className="list-group mb-3">
          {comments.map((comment, idx) => (
            <li key={idx} className="list-group-item">{comment}</li>
          ))}
        </ul>
        <textarea
          className="form-control mb-2"
          rows="3"
          placeholder="Lägg till en kommentar..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment} className="btn btn-primary">Lägg till kommentar</button>
      </div>
    </div>
  );
}

export default RecipeDetail;