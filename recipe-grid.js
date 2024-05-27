document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipesParam = urlParams.get("recipe");

  if (recipesParam) {
    const filteredRecipes = JSON.parse(decodeURIComponent(recipesParam));
    createRecipeGrid(filteredRecipes);
  } else {
    createRecipeGrid(recipes);
  }
});

function createRecipeGrid(recipe) {
  const recipeGrid = document.getElementById("recipe-grid-container");

  recipe.forEach((recipe) => {
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

// Handle Search bar
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-icon");
searchButton.addEventListener("click", handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const inputString = searchInput.value.trim().toLowerCase();
  if (inputString) {
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(inputString)
    );
    const queryString = encodeURIComponent(JSON.stringify(filteredRecipes));
    window.location.href = `recipe-grid.html?recipe=${queryString}`;
  } else {
    window.location.href = `recipe-grid.html`;
  }
}

function handleIconClick(event) {
  if (event.target.id === "search-icon") {
    handleSearch();
  }
}
