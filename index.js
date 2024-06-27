import { setNavBar, setSearch, fetchRecipes, storeRecipes } from "./common.js";

document.addEventListener("DOMContentLoaded", () => {
  setNavBar();
  setSearch();
  createNewRecipeForm();
});

// Add new recipe
function createNewRecipeForm() {
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
      const preparationStepsInput = document
        .getElementById("preparation-steps")
        .value.split("\n");

      if (ingredientsInput.length < 5) {
        alert("Please provide at least 5 ingredients.");
        return;
      }

      const ingredients = [];
      ingredientsInput.forEach((ingredientLine) => {
        if (ingredientLine.trim() === "") return;

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
      const preparationSteps = [];
      preparationStepsInput.forEach((preparationStepLine) => {
        if (preparationStepLine.trim() === "") return;
        preparationSteps.push(preparationStepLine);
      });

      const recipes = fetchRecipes();
      const newRecipeData = {
        id: recipes.length + 1,
        title,
        imageUrl,
        description,
        ingredients,
        preparationSteps,
      };
      addNewRecipe(newRecipeData);

      function addNewRecipe(newRecipeData) {
        let recipes = fetchRecipes();
        const newRecipe = {
          id: recipes.length + 1,
          title: newRecipeData.title,
          picture_url: newRecipeData.imageUrl,
          description: newRecipeData.description,
          ingredients: newRecipeData.ingredients,
          preparationSteps: newRecipeData.preparationSteps,
        };
        recipes.push(newRecipe);
        storeRecipes(recipes);
        window.location.assign(`recipe-details.html?id=${newRecipe.id}`);
      }
      newRecipeForm.reset();
    });
  }
}
