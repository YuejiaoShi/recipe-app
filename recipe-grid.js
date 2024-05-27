document.addEventListener("DOMContentLoaded", () => {
  createRecipeGrid();
});

function createRecipeGrid(recipe) {
  const recipeGrid = document.getElementById("recipe-grid-container");

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    const recipeLink = document.createElement("a");
    recipeLink.href = `recipe-details.html?id=${recipe.id}`;

    const img = document.createElement("img");
    img.src = recipe.picture_url;

    const imgCaption = document.createElement("figcaption");
    imgCaption.textContent = recipe.title;

    recipeLink.appendChild(img);
    recipeLink.appendChild(imgCaption);

    recipeCard.appendChild(recipeLink);
    recipeGrid.appendChild(recipeCard);
  });
}

// Handle Home link
const setHome = document.getElementById("nav-home");
if (setHome) {
  setHome.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// Handle recipes grid
const gridOfAllRecipes = document.getElementById("nav-recipes");
if (gridOfAllRecipes) {
  gridOfAllRecipes.addEventListener("click", () => {
    window.location.href = "recipe-grid.html";
  });
}
