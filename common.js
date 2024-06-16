// Handle Home link and Recipes Grid link
export function setNavBar() {
  const setHome = document.getElementById("nav-home");
  if (setHome) {
    setHome.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  const gridOfAllRecipes = document.getElementById("nav-recipes");
  if (gridOfAllRecipes) {
    gridOfAllRecipes.addEventListener("click", () => {
      localStorage.removeItem("filteredRecipes");
      window.location.href = "recipe-grid.html";
    });
  }
}

// Handle Search bar
export function setSearch() {
  const recipes = JSON.parse(localStorage.getItem("recipes"));

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
    localStorage.setItem("filteredRecipes", JSON.stringify(filteredRecipes));
    window.location.href = `recipe-grid.html`;
  }
}
export function fetchRecipes() {
  return JSON.parse(localStorage.getItem("recipes"));
}
export function storeRecipes(recipes) {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}
