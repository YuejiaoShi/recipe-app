import { setNavBar, setSearch } from "./common.js";
document.addEventListener("DOMContentLoaded", () => {
  initializePage();
});

function initializePage() {
  setNavBar();
  setSearch();
  setSorting();

  const filteredRecipesStr = localStorage.getItem("filteredRecipes");

  if (filteredRecipesStr) {
    const filteredRecipes = JSON.parse(filteredRecipesStr);
    createRecipeGrid(filteredRecipes);
  } else {
    const newRecipeStr = localStorage.getItem("newRecipe");
    if (newRecipeStr) {
      const newRecipe = JSON.parse(newRecipeStr);
      recipes.push(newRecipe);
    }
    createRecipeGrid(recipes);
  }
}

// Make recipes grid main contents
function createRecipeGrid(recipesToShow) {
  const recipeGrid = document.getElementById("recipe-grid-container");
  recipeGrid.innerHTML = "";

  recipesToShow.forEach((recipe) => {
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


// Handle sort
function sortRecipes(sortOption, recipes) {
  if (sortOption === "by-increasing-ingredient-amount") {
    return recipes
      .slice()
      .sort((a, b) => a.ingredients.length - b.ingredients.length);
  } else if (sortOption === "by-decreasing-ingredient-amount") {
    return recipes
      .slice()
      .sort((a, b) => b.ingredients.length - a.ingredients.length);
  } // more  options in the future
  return recipes;
}

function setSorting() {
  const sortSelect = document.getElementById("sort-by");
  sortSelect.addEventListener("change", handleSort);

  function handleSort() {
    const sortSelect = document.getElementById("sort-by");
    const selectedOption = sortSelect.value;

    const filteredRecipesStr = localStorage.getItem("filteredRecipes");
    let filteredRecipes = [];

    if (filteredRecipesStr) {
      filteredRecipes = JSON.parse(filteredRecipesStr);
    } else {
      filteredRecipes = recipes;
    }

    const sortedRecipes = sortRecipes(selectedOption, filteredRecipes);
    createRecipeGrid(sortedRecipes);
  }
}
