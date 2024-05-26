document.addEventListener("DOMContentLoaded", () => {
  recipes.forEach((recipe) => {
    setRecipe(recipe);
  });
});

function setRecipe(recipe) {
  setRecipeTitle(recipe);
  setRecipeImage(recipe);
  setRecipeDescription(recipe);
  setIngredients(recipe);
  setPreparationSteps(recipe);
}

const recipes = [
  {
    id: 1,
    title: "Gløgg",
    picture_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Gl%C3%B6gg_kastrull.JPG/800px-Gl%C3%B6gg_kastrull.JPG",
    description:
      "Flæskesteg, a Danish Crisp Pork, is a cherished dish deeply rooted in Danish culinary tradition. It's not just a meal; it's a centerpiece of celebration, often enjoyed during holidays like Christmas. This dish boasts a succulent pork roast with a perfectly crispy and crackling skin, making it a delight for both the palate and the senses.",
    ingredients: [
      { NAME: "Orange zest", AMOUNT: "0.5" },
      { NAME: "Water", AMOUNT: "200 ml" },
      { NAME: "Sugar", AMOUNT: "275 g" },
      { NAME: "Whole cloves", AMOUNT: "5" },
      { NAME: "Cinnamon sticks", AMOUNT: "2" },
      { NAME: "Spice", AMOUNT: undefined },
      { NAME: "Bottle of red wine", AMOUNT: "1" },
      { NAME: "Raisins", AMOUNT: "100 g" },
      { NAME: "Slipped Almonds", AMOUNT: "50 g" },
    ],
    preparationSteps: ["Mix everything, heat it, and you are good to go!"],
  },
];

function setRecipeTitle(recipe) {
  const recipeTitle = document.getElementById("recipe-title");
  if (recipeTitle) {
    recipeTitle.textContent = recipe.title;
  } else {
    console.error("Element #recipe-title not found");
  }
}

function setRecipeImage(recipe) {
  const recipeImage = document.getElementById("recipe-image");
  if (recipeImage) {
    recipeImage.src = recipe.picture_url;
    recipeImage.alt = recipe.title;
  } else {
    console.error("Element #recipe-image not found");
  }
}

function setRecipeDescription(recipe) {
  const recipeDescription = document.getElementById("recipe-description");
  if (recipeDescription) {
    recipeDescription.innerText = recipe.description;
  } else {
    console.error("Element #recipe-description not found");
  }
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
  console.error("Element #new-recipe-form not found");
}

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
