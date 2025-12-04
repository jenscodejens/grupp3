import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById, addRating } from "../api";

// Component for displaying detailed view of a single recipe
function RecipeDetail() {
  const { id } = useParams();
  // State for recipe data, loading, and error handling
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for rating functionality
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  // State for comments
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
  
    // Fetch recipe data when component mounts or id changes
    useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipeById(id);
        const fetchedRecipe = response.data;
        setRecipe(fetchedRecipe);
        setRating(fetchedRecipe.avgRating || 0);
        setComments(fetchedRecipe.comments || []);
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
  };

  useEffect(() => {
    if (id) fetchRecipeAndComments();
    // eslint-disable-next-line
  }, [id]);

  const handleRate = async (rate) => {
    try {
      await addRating(id, rate);
      setUserRating(rate);
      alert("Tack för din röst!");
    } catch (error) {
      alert("Failed to submit rating");
    }
  };

  // Handle adding a comment (no rating per comment)
  const handleAddComment = async () => {
    if (!newComment.trim() || saving) return;
    setSaving(true);

    try {
      await apiClient.post(`/recipes/${id}/comments`, {
        comment: newComment.trim(),
        name: userName.trim() || "Anonymous"
      });
      setNewComment("");
      setUserName("");

      // Refresh comments
      const resComments = await apiClient.get(`/recipes/${id}/comments`);
      setComments(Array.isArray(resComments.data) ? resComments.data : resComments.data.comments || []);
    } catch (err) {
      console.error(err);
      alert("Failed to save comment.");
    } finally {
      setSaving(false);
    }
  };

  // Format timestamp
  const formatDate = (isoString) => isoString ? new Date(isoString).toLocaleString() : "";

  // Render stars (readonly)
  const renderStars = (ratingValue) => {
    return (
      <>
        {[1,2,3,4,5].map(i =>
          <span key={i} style={{ color: i <= ratingValue ? "#ffc107" : "#ccc" }}>
            ★
          </span>
        )}
      </>
    );
  };

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
{/*       <p className="mb-2"><strong>Debug_id:</strong> {recipe._id}</p> */}
      <p className="mb-2"><strong>Kategori:</strong> {recipe.categories}</p>
      <p className="mb-2"><strong>Tid:</strong> {recipe.timeInMins} min</p>
      <p className="mb-2"><strong>Pris:</strong> {recipe.price ? `${recipe.price} kr` : 'N/A'}</p>
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
              Lägg till kommentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;