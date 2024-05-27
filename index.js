document.addEventListener("DOMContentLoaded", () => {
  const hideRecipeParts = document.querySelectorAll(".hide-recipe-part");
  if (hideRecipeParts) {
    hideRecipeParts.forEach((part) => part.classList.add("hide"));
  }

  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = parseInt(urlParams.get("id"), 0);

  if (recipeId) {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (recipe) {
      setRecipe(recipe);
    } else {
      console.error("Recipe not found");
    }
  }
});

function setRecipe(recipe) {
  setRecipeTitle(recipe);
  setMeta(recipe);
  setRecipeImage(recipe);
  setRecipeDescription(recipe);
  setIngredients(recipe);
  setPreparationSteps(recipe);
}

function setRecipeTitle(recipe) {
  const recipeTitle = document.getElementById("recipe-title");
  recipeTitle
    ? (recipeTitle.textContent = recipe.title)
    : console.error("Element #recipe-title not found");
}

function setMeta(recipe) {
  const recipePublished = document.getElementById("published");
  const recipeLikes = document.getElementById("likes");
  const recipeComments = document.getElementById("comments");
  recipePublished
    ? (recipePublished.textContent = recipe.published)
    : console.error("Element #published not found");
  recipeLikes
    ? (recipeLikes.textContent = recipe.likes)
    : console.error("Element #likes not found");
  recipeComments
    ? (recipeComments.textContent = recipe.comments)
    : console.error("Element #comments not found");
}

function setRecipeImage(recipe) {
  const recipeImage = document.getElementById("recipe-image");
  recipeImage
    ? ((recipeImage.src = recipe.picture_url), (recipeImage.alt = recipe.title))
    : console.error("Element #recipe-image not found");
}

function setRecipeDescription(recipe) {
  const recipeDescription = document.getElementById("recipe-description");
  recipeDescription
    ? (recipeDescription.innerText = recipe.description)
    : console.error("Element #recipe-description not found");
}

function setIngredients(recipe) {
  const ingredientList = document.querySelector("#recipe-ingredients ul");
  if (ingredientList) {
    ingredientList.innerHTML = "";
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      if (ingredient.NAME && ingredient.AMOUNT) {
        li.textContent = `${ingredient.NAME}: ${ingredient.AMOUNT}`;
      } else if (ingredient.NAME && !ingredient.AMOUNT) {
        li.textContent = `${ingredient.NAME}: appropriate`;
      }
      ingredientList.appendChild(li);
    });
  } else {
    console.log("Element #recipe-ingredients ul not found");
  }
}

function setPreparationSteps(recipe) {
  const preparationStepsList = document.querySelector("#preparation ul");

  if (preparationStepsList) {
    preparationStepsList.innerHTML = "";
    recipe.preparationSteps.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      preparationStepsList.appendChild(li);
    });
  } else {
    console.error("Element #preparation ul not found");
  }
}
// Add new Ingredients
const newIngredientForm = document.getElementById("new-ingredient-form");
if (newIngredientForm) {
  newIngredientForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newIngredientName = document.getElementById("ingredient-name").value;
    const newIngredientAmount =
      document.getElementById("ingredient-amount").value;

    if (!newIngredientName) {
      alert("Please provide ingredient name.");
      return;
    }

    const currentRecipe = recipes[recipes.length - 1];
    currentRecipe.ingredients.push({
      NAME: newIngredientName,
      AMOUNT: newIngredientAmount,
    });

    document.getElementById("ingredient-name").value = "";
    document.getElementById("ingredient-amount").value = "";

    setIngredients(currentRecipe);
  });
} else {
  console.error("Element #new-ingredient-form not found");
}

// Add new recipe
function addNewRecipe(newRecipeData) {
  const newRecipe = {
    id: recipes.length + 1,
    title: newRecipeData.title,
    picture_url: newRecipeData.imageUrl,
    description: newRecipeData.description,
    ingredients: newRecipeData.ingredients,
    preparationSteps: newRecipeData.preparationSteps,
  };

  recipes.push(newRecipe);

  setRecipe(newRecipe);
}

const newRecipeForm = document.getElementById("new-recipe-form");
if (newRecipeForm) {
  newRecipeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const hideRecipeParts = document.querySelectorAll(".hide-recipe-part");
    if (hideRecipeParts) {
      hideRecipeParts.forEach((part) => part.classList.remove("hide"));
    }

    const title = document.getElementById("title").value;
    const imageUrl = document.getElementById("image-url").value;
    const description = document.getElementById("description").value;
    const ingredientsInput = document
      .getElementById("ingredients")
      .value.split("\n");
    const preparationSteps = document
      .getElementById("preparation-steps")
      .value.split("\n");

    if (ingredientsInput.length < 5) {
      alert("Please provide at least 5 ingredients.");
      return;
    }

    const ingredients = [];
    ingredientsInput.forEach((ingredientLine) => {
      const parts = ingredientLine.split(":");

      if (parts.length !== 2) {
        alert(
          "Invalid ingredient format. Please use 'Ingredient Name: Amount' format."
        );
        return;
      }

      const name = parts[0].trim();
      const amount = parts[1].trim();

      ingredients.push({ NAME: name, AMOUNT: amount });
    });

    const newRecipeData = {
      id: recipes.length + 1,
      title,
      imageUrl,
      description,
      ingredients,
      preparationSteps,
    };
    console.log(recipes);
    addNewRecipe(newRecipeData);

    document.getElementById("title").value = "";
    document.getElementById("image-url").value = "";
    document.getElementById("description").value = "";
    document.getElementById("ingredients").value = "";
    document.getElementById("preparation-steps").value = "";
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
