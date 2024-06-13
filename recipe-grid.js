import { setNavBar, setSearch, fetchRecipes, storeRecipes } from "./common.js";

async function fetchInitialRecipes() {
  const response = await fetch(
    "https://raw.githubusercontent.com/YuejiaoShi/YuejiaoShi.github.io/main/data/recipes.json"
  );
  const data = await response.json();
  return data.recipes;
}

// import data from "./data/recipes.json" assert { "type": "json" };
// const initialRecipes = data.recipes;

document.addEventListener("DOMContentLoaded", async () => {
  const initialRecipes = await fetchInitialRecipes();

  if (localStorage.getItem("recipes") === null) {
    storeRecipes(initialRecipes);
  }
  const recipes = fetchRecipes();
  initializePage(recipes);
});
function initializePage(recipes) {
  setNavBar();
  setSearch();
  setSorting();

  const filteredRecipesStr = localStorage.getItem("filteredRecipes");
  recipes = recipes || [];
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

    const recipes = fetchRecipes();

    const sortedRecipes = sortRecipes(selectedOption, recipes);
    createRecipeGrid(sortedRecipes);
  }
}
