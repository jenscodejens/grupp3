export default function RecipeCategory({ title, recipes }) {
  return (
<div className="category-block">
<h2>{title}</h2>
 
      <div className="recipe-list">
        {recipes.map((recipe) => (
<div key={recipe.id} className="recipe-card">
<h3>{recipe.name}</h3>
<img src={recipe.image} alt={recipe.name} />
 
            <p>{recipe.shortDescription}</p>
</div>
        ))}
</div>
</div>
  );
}
