import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/base";

// Component for displaying detailed view of a single recipe
function RecipeDetail() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Comment fields
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");

  // Recipe rating fields
  const [userRating, setUserRating] = useState(0); // user's latest recipe rating (local only)
  const [hoverRating, setHoverRating] = useState(0);
  const [saving, setSaving] = useState(false);

  // Fetch recipe and comments
  const fetchRecipeAndComments = async () => {
    try {
      const resRecipe = await apiClient.get(`/recipes/${id}`);
      setRecipe(resRecipe.data);

      // If your backend returns user rating info, set userRating here

      const resComments = await apiClient.get(`/recipes/${id}/comments`);
      setComments(Array.isArray(resComments.data) ? resComments.data : resComments.data.comments || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load recipe or comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchRecipeAndComments();
    // eslint-disable-next-line
  }, [id]);

  if (loading) return <div className="container mt-4">Loading recipe...</div>;
  if (error) return <div className="container mt-4">{error}</div>;
  if (!recipe) return <div className="container mt-4">Recipe not found</div>;

  // Handle recipe rating (save separately from comment)
  const handleRate = async (star) => {
    if (saving) return;
    setSaving(true);
    try {
      await apiClient.post(`/recipes/${id}/ratings`, { rating: star });
      setUserRating(star);
      await fetchRecipeAndComments(); // refresh avgRating
      alert("Tack för din röst!");
    } catch (err) {
      console.error(err);
      alert("Failed to save rating.");
    } finally {
      setSaving(false);
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
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <div className="card shadow-sm mb-4">
        <img
          src={recipe.imageUrl}
          className="card-img-top"
          alt={recipe.title}
          style={{ height: "300px", objectFit: "cover" }}
          onError={e =>
            (e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png")
          }
        />
        <div className="card-body">
          <h2 className="card-title">{recipe.title}</h2>
          <p className="card-text">{recipe.description}</p>

          <div className="mb-3">
            <strong>Kategori:</strong>{" "}
            {Array.isArray(recipe.categories)
              ? recipe.categories.join(", ")
              : recipe.categories || "Ingen kategori"}
            <br />
            <strong>Tid:</strong> {recipe.timeInMins || "N/A"} min <br />
            <strong>Betyg:</strong> {recipe.avgRating?.toFixed(1) || "N/A"} / 5
          </div>

          {/* Ingredients */}
          <h5>Ingredienser:</h5>
          <ul className="list-group mb-3">
            {recipe.ingredients?.length > 0 ? (
              recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="list-group-item">
                  {ing.amount} {ing.unit} {ing.name}
                </li>
              ))
            ) : (
              <li className="list-group-item">Inga ingredienser</li>
            )}
          </ul>

          {/* Instructions */}
          <h5>Steg:</h5>
          <ol className="list-group list-group-numbered mb-3">
            {recipe.instructions?.length > 0 ? (
              recipe.instructions.map((step, idx) => (
                <li key={idx} className="list-group-item">{step}</li>
              ))
            ) : (
              <li className="list-group-item">Inga instruktioner</li>
            )}
          </ol>

          {/* Main Recipe Rating */}
          <div className="mb-3">
            <label>
              <strong>Ge betyg för hela receptet:</strong>
            </label>
            <div>
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    color: star <= (hoverRating || userRating) ? "#ffc107" : "#ccc",
                    transition: "color 0.2s"
                  }}
                  onClick={() => handleRate(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
              {userRating ? <span style={{marginLeft:8}}>({userRating}/5)</span> : null}
            </div>
          </div>

          {/* Comments */}
          <div className="mb-3">
            <h5>Kommentarer:</h5>
            <ul className="list-group mb-2">
              {comments.filter(c => c.comment && c.comment.trim() !== '').length > 0 ?
                comments
                  .filter(c => c.comment && c.comment.trim() !== '') 
                  .map((c) => (
                    <li key={c._id || Math.random()} className="list-group-item">
                      <strong>{c.name || "Anonymous"}</strong>{" "}
                      <span style={{ color: "#777", fontSize: "90%" }}>
                        {formatDate(c.createdAt)}
                      </span>
                      <br />
                      {c.comment}
                    </li>
                  ))
                : <li className="list-group-item">Inga kommentarer ännu.</li>
              }
            </ul>

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ditt namn (valfritt)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={saving}
            />
            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="Lägg till en kommentar..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              disabled={saving}
            />

            <button
              className="btn btn-primary"
              onClick={handleAddComment}
              disabled={saving || !newComment.trim()}
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