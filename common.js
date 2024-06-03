// I want to reuse these 2 functions in other js files,
// but I tried my best, and still cannot make it work....


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
