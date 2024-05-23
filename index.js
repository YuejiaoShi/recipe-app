document.addEventListener("DOMContentLoaded", () => {
  recipeObject.forEach((recipe) => {
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

const recipeObject = [
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

const newRecipeForm = document.getElementById("new-recipe-form");
if (newRecipeForm) {
  newRecipeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newIngredientName = document.getElementById("ingredient-name").value;
    const newIngredientAmount =
      document.getElementById("ingredient-amount").value;

    if (!newIngredientName) {
      alert("Please provide ingredient name.");
      return;
    }

    const existingRecipe = recipeObject[0];
    existingRecipe.ingredients.push({
      NAME: newIngredientName,
      AMOUNT: newIngredientAmount,
    });

    document.getElementById("ingredient-name").value = "";
    document.getElementById("ingredient-amount").value = "";

    setIngredients(existingRecipe);
  });
} else {
  console.error("Element #new-recipe-form not found");
}
