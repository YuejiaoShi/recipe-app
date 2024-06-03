document.addEventListener("DOMContentLoaded", () => {
  initializePage();
});

function initializePage() {
  setNavBar();
  setSearch();
  setSorting();

  const urlParams = new URLSearchParams(window.location.search);
  const recipesParam = urlParams.get("recipe");

  if (recipesParam) {
    const filteredRecipes = JSON.parse(decodeURIComponent(recipesParam));
    createRecipeGrid(filteredRecipes);
  } else {
    createRecipeGrid(recipes);
  }
}

// Make recipes grid main contents
function createRecipeGrid(recipe) {
  const recipeGrid = document.getElementById("recipe-grid-container");
  recipeGrid.innerHTML = "";

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

// Handle Home link and Recipes Grid links
function setNavBar() {
  const setHome = document.getElementById("nav-home");
  if (setHome) {
    setHome.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  const gridOfAllRecipes = document.getElementById("nav-recipes");
  if (gridOfAllRecipes) {
    gridOfAllRecipes.addEventListener("click", () => {
      window.location.href = "recipe-grid.html";
    });
  }
}

// Handle Search bar
function setSearch() {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-icon");
  searchButton.addEventListener("click", handleSearch);

  function searchRecipes(inputString) {
    inputString = inputString.trim().toLowerCase();
    if (inputString) {
      return recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(inputString)
      );
    } else {
      return recipes;
    }
  }
  function handleSearch(event) {
    event.preventDefault();
    const inputString = searchInput.value;
    const filteredRecipes = searchRecipes(inputString);
    const queryString = encodeURIComponent(JSON.stringify(filteredRecipes));
    window.location.href = `recipe-grid.html?recipe=${queryString}`;
  }
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
    const selectedOption = sortSelect.value;
    const urlParams = new URLSearchParams(window.location.search);
    const recipesParam = urlParams.get("recipe");

    let filteredRecipes = recipes;

    if (recipesParam) {
      filteredRecipes = JSON.parse(decodeURIComponent(recipesParam));
    }

    const sortedRecipes = sortRecipes(selectedOption, filteredRecipes);
    createRecipeGrid(sortedRecipes);
  }
}
