document.addEventListener("DOMContentLoaded", () => {
  setRecipeTitle();
  setRecipeImage();
  setRecipeDescription();
  setIngredients();
  setIngredientNotes();
  setPreparationSteps();
  setGarnishes();
});

const recipeObject = {
  id: 1,
  title: "Danish Crisp Pork (Flæskesteg)",
  picture_url:
    "https://i0.wp.com/skandibaking.com/wp-content/uploads/2022/12/danish-roast-pork-flaeskesteg-5.jpg?w=1381&ssl=1",
  description:
    "Flæskesteg, a Danish Crisp Pork, is a cherished dish deeply rooted in Danish culinary tradition. It's not just a meal; it's a centerpiece of celebration, often enjoyed during holidays like Christmas. This dish boasts a succulent pork roast with a perfectly crispy and crackling skin, making it a delight for both the palate and the senses.",
  ingredients: [
    "2 kg pork roast with skin (preferably from the neck or loin)",
    "20 grams Coarse sea salt",
    "1 cup boiling water",
  ],
  ingredientNotes: [
    {
      title: "Pork Roast",
      amount: "2 kg",
      description:
        "Select a pork roast with a thick layer of skin, preferably from the neck or loin. This ensures optimal crackling. If possible, ask your butcher to score the skin in a diamond pattern.",
    },
    {
      title: "Coarse Sea Salt",
      amount: "20 grams",
      description:
        "Coarse sea salt is essential for seasoning the pork and aiding in the formation of crispy crackling. Rubbing salt into the scored skin ensures even seasoning and helps draw out moisture for a crispy finish.",
    },
    {
      title: "Boiling Water",
      amount: "500 ml",
      description:
        "Pouring boiling water over the pork before roasting creates steam, which assists in achieving a crispy skin. This step is crucial for Flæskesteg preparation.",
    },
  ],
  preparationSteps: [
    "Preheat your oven to 230°C (450°F).",
    "Score the skin of the pork roast in a diamond pattern, ensuring not to cut into the meat.",
    "Rub a generous amount of coarse sea salt into the scored skin, covering the entire surface.",
    "Place the pork roast on a rack in a roasting pan, skin-side up.",
    "Pour the boiling water over the pork, ensuring it covers the entire surface of the skin.",
    "Roast the pork in the preheated oven for 30 minutes to crisp up the skin.",
    "Reduce the oven temperature to 175°C (350°F) and continue roasting for 2 to 2.5 hours, or until the internal temperature reaches 70-75°C (160-170°F).",
    "Once cooked, remove the pork from the oven and let it rest for 15-20 minutes before carving.",
    "Slice the pork roast and serve hot with traditional accompaniments like red cabbage, potatoes, and pickles.",
  ],
  garnishes: ["Red cabbage", "Potatoes", "Pickles"],
};

function setRecipeTitle() {
  const recipeTitle = document.getElementById("recipe-title");
  if (recipeTitle) {
    recipeTitle.textContent = recipeObject.title;
  } else {
    console.error("Element #recipe-title not found");
  }
}

function setRecipeImage() {
  const recipeImage = document.getElementById("recipe-image");
  if (recipeImage) {
    recipeImage.src = recipeObject.picture_url;
    recipeImage.alt = recipeObject.title;
  } else {
    console.error("Element #recipe-image not found");
  }
}

function setRecipeDescription() {
  const recipeDescription = document.getElementById("recipe-description");
  if (recipeDescription) {
    recipeDescription.innerText = recipeObject.description;
  } else {
    console.error("Element #recipe-description not found");
  }
}

function setIngredients() {
  const ingredientsList = document.getElementById("recipe-ingredients");
  if (ingredientsList) {
    recipeObject.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });
  } else {
    console.error("Element #recipe-ingredients not found");
  }
}

function setIngredientNotes() {
  const ingredientNotesList = document.querySelector("#ingredient-notes ul");
  if (ingredientNotesList) {
    recipeObject.ingredientNotes.forEach((note) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${note.title}</strong>${note.description}`;
      ingredientNotesList.appendChild(li);
    });
  } else {
    console.error("Element #ingredient-notes ul not found");
  }
}

function setPreparationSteps() {
  const preparationStepsList = document.querySelector("#preparation ul");
  if (preparationStepsList) {
    recipeObject.preparationSteps.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      preparationStepsList.appendChild(li);
    });
  } else {
    console.error("Element #ingredient-notes ul not found");
  }
}

function setGarnishes() {
  const garnishesList = document.querySelector("#garnishes p");

  if (garnishesList && recipeObject.garnishes) {
    recipeObject.garnishes.forEach((garnish, index) => {
      const garnishesCount = recipeObject.garnishes.length;
      const span = document.createElement("span");
      span.textContent =
        index === garnishesCount - 1 ? `${garnish}.` : `${garnish}, `;
      garnishesList.appendChild(span);
    });
  } else {
    console.error("Element #garnishes ul not found");
  }
}
