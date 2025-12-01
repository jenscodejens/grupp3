import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../api";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Local comments store
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Load recipe + load localStorage comments
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipeById(id);
        const fetchedRecipe = response.data;
        setRecipe(fetchedRecipe);
        setRating(fetchedRecipe.avgRating || 0);

        // Load comments from localStorage
        const savedComments = localStorage.getItem(`comments-${id}`);
        if (savedComments) {
          setComments(JSON.parse(savedComments));
        }
      } catch (err) {
        setError('Failed to load recipe');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  // Rating function
  const handleRate = (rate) => {
    setUserRating(rate);
    setRating((rating + rate) / 2);
    alert("Tack för din röst!");
  };

  // Add new comment + save to localStorage
  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment.trim()];

      setComments(updatedComments);
      setNewComment('');

      // Save to localStorage so comments persist
      localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));

      alert("Kommentar tillagd!");
    }
  };

  if (loading) return <div className="container mt-4"><p>Loading recipe...</p></div>;
  if (error) return <div className="container mt-4"><p>{error}</p></div>;
  if (!recipe) return <div className="container mt-4"><p>Receptet hittades inte.</p></div>;

  return (
    <div className="container mt-4" style={{ maxWidth: '760px' }}>
      <h2 className="mb-3">{recipe.title}</h2>
      <p className="mb-3">{recipe.description}</p>

      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="img-fluid rounded mb-3"
        style={{ height: '200px', objectFit: 'cover' }}
        onError={(e) => e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'}
      />

      <p className="mb-2"><strong>Debug_id:</strong> {recipe._id}</p>
      <p className="mb-2"><strong>Kategori:</strong> {recipe.categories}</p>
      <p className="mb-2"><strong>Tid:</strong> {recipe.timeInMins} min</p>
      <p className="mb-2"><strong>Pris:</strong> {recipe.price ? `${recipe.price} kr` : 'N/A'}</p>
      <p className="mb-4"><strong>Betyg:</strong> {rating.toFixed(1)} / 5</p>

      <h4 className="mt-4 mb-3">Ingredienser:</h4>
      <ul className="list-group mb-3">
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx} className="list-group-item">
            {ing.amount} {ing.unit} {ing.name}
          </li>
        ))}
      </ul>

      <h4 className="mt-4 mb-3">Steg:</h4>
      <ol className="list-group list-group-numbered mb-4">
        {recipe.instructions.map((step, idx) => (
          <li key={idx} className="list-group-item">{step}</li>
        ))}
      </ol>

      {/* Rating Section */}
      <div className="mt-4">
        <label className="form-label">Ge betyg (1-5):</label>
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

      {/* Comment Section */}
      <div className="mt-4">
        <h5>Kommentarer:</h5>

        <ul className="list-group mb-3">
          {comments.length === 0 && (
            <li className="list-group-item">Inga kommentarer ännu.</li>
          )}

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

        <button onClick={handleAddComment} className="btn btn-primary">
          Lägg till kommentar
        </button>
      </div>
    </div>
  );
}

export default RecipeDetail;
