import { setNavBar, setSearch, fetchRecipes, storeRecipes } from "./common.js";

document.addEventListener("DOMContentLoaded", () => {
  const allRecipes = fetchRecipes();
  initializePage(allRecipes);
});

function initializePage(recipes) {
  storeRecipes(recipes);
  setNavBar();
  setSearch();
  createNewRecipeForm();
  createNewIngredientForm();
  trackTimeSpent();
  setCookingTimer();
  const allRecipes = fetchRecipes();
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = parseInt(urlParams.get("id"));
  const recipe = allRecipes.find((r) => r.id === recipeId);
  if (recipe) {
    displayRecipe(recipe);
  } else {
    alert("Recipe not found");
  }
}

function displayRecipe(recipe) {
  setRecipeTitle(recipe);
  setMeta(recipe);
  setRecipeImage(recipe);
  setRecipeDescription(recipe);
  setIngredients(recipe);
  setPreparationSteps(recipe);
  setCookingTimer(recipe);
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
  preparationStepsList.innerHTML = "";
  if (preparationStepsList) {
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
function createNewIngredientForm() {
  const recipes = fetchRecipes();
  const newIngredientForm = document.getElementById("new-ingredient-form");
  if (newIngredientForm) {
    newIngredientForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const newIngredientName =
        document.getElementById("ingredient-name").value;
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
}

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
        displayRecipe(newRecipe);
      }

      document.getElementById("title").value = "";
      document.getElementById("image-url").value = "";
      document.getElementById("description").value = "";
      document.getElementById("ingredients").value = "";
      document.getElementById("preparation-steps").value = "";
    });
  }
}

// Track Time Spent on page;
function trackTimeSpent() {
  const timeSpentOnPageSpan = document.getElementById("time-spent-on-page");
  const startTime = new Date();

  function updateTime() {
    const currentTime = new Date();
    const timeDifference = currentTime - startTime;
    const totalSeconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    timeSpentOnPageSpan.textContent = `${minutes} : ${seconds}`;
  }
  setInterval(updateTime, 1000);
}
// set cooking timer
function setCookingTimer() {
  let cookingTimer;
  let remainingSeconds;
  const defaultMinutes = 10;
  const TimerStatus = {
    Start: "Start",
    Pause: "Pause",
    Continue: "Continue",
  };
  let currentTimerStatus = TimerStatus.Start;

  const cookingTimerSpan = document.getElementById("cooking-timer-span");
  const startButton = document.getElementById("start-button");
  const cancelButton = document.getElementById("cancel-button");

  startButton.addEventListener("click", () => {
    const input = document.getElementById("cooking-timer-input");
    const seconds = 60 * parseInt(input.value);
    switch (currentTimerStatus) {
      case TimerStatus.Start:
        startTimer(seconds);
        break;
      case TimerStatus.Continue:
        continueTimer(remainingSeconds);
        break;
      case TimerStatus.Pause:
        stopTimer();
        break;
      default:
        throw "Unknown TimerStatus" + currentTimerStatus;
    }
  });

  function continueTimer(remainingSeconds) {
    startCookingTimer(remainingSeconds);
    updateTimerStatus();
  }

  function stopTimer() {
    stopCookingTimer();
    updateTimerStatus();
  }

  function startTimer(seconds) {
    startCookingTimer(seconds);
    updateTimerStatus();
    document.getElementById("cooking-timer-input").readOnly = true;
  }

  function updateTimerStatus() {
    switch (currentTimerStatus) {
      case TimerStatus.Start:
        currentTimerStatus = TimerStatus.Pause;
        break;
      case TimerStatus.Continue:
        currentTimerStatus = TimerStatus.Pause;
        break;
      case TimerStatus.Pause:
        currentTimerStatus = TimerStatus.Continue;
        break;
      default:
        throw "Unknown TimerStatus" + currentTimerStatus;
    }
    document.getElementById("start-button").innerText = currentTimerStatus;
  }

  function clearTimeStatus() {
    currentTimerStatus = TimerStatus.Start;
    document.getElementById("start-button").innerText = currentTimerStatus;
  }

  cancelButton.addEventListener("click", () => {
    clearInterval(cookingTimer);
    document.getElementById("cooking-timer-input").value = defaultMinutes;
    cookingTimerSpan.textContent = "";
    document.getElementById("cooking-timer-input").readOnly = false;
    clearTimeStatus();
  });

  function startCookingTimer(totalSeconds) {
    clearInterval(cookingTimer);
    remainingSeconds = totalSeconds;
    updateTimerDisplay(remainingSeconds);

    cookingTimer = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds <= 0) {
        clearInterval(cookingTimer);
        alert("Cooking time is up!");
        updateTimerDisplay(0);
      } else {
        updateTimerDisplay(remainingSeconds);
      }
    }, 1000);
  }

  function stopCookingTimer() {
    clearInterval(cookingTimer);
  }

  function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    cookingTimerSpan.textContent = `Time Remaining: ${minutes}:${
      displaySeconds < 10 ? "0" : ""
    }${displaySeconds}`;
  }
}
