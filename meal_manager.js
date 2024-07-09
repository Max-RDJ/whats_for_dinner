// Create array of meals with subarrays of ingredients
const charImage = '<img id="char" src="https://drive.google.com/thumbnail?id=1CbV--Oogrro5joi_tY3XMg_7r5GLoLJV" width="18px">';
const meals =  [
    {
    mealName: "Thai Green Curry",
    ingredients: [
        "Thai green paste",
        "chickpeas",
        "coconut milk",
        "tenderstem broccoli",
        "rice"
    ]
    },
    {
    mealName: `Chickpea Coconut Curry ${charImage}`,
    ingredients: [
        "chickpeas",
        "coconut milk",
        "passata",
        "bell pepper"
    ]
    },
    {
    mealName: "Spaghetti and Meatballs",
    ingredients: [
        "spaghetti",
        "bolognese sauce",
        "meatballs"
    ]
    },
    {
    mealName: "Stir fry",
    ingredients: [
        "Fake chicken",
        "Bell pepper",
        "Noodles",
        "Teryaki sauce"
    ]
    }
]

// Initialise
    let mainContainer = document.querySelector("main");
    let mealInput = document.getElementById("mealInput");
    let meal_list = localStorage.getItem("meals") ? JSON.parse(localStorage.getItem("meals")).meals : ["sd"];

function paintUI() {
    let new_inner_html = "";
    for (let i = 0; i < meals.length; i++) {
        const meal = meals[i].mealName;
        const ingredients = meals[i].ingredients.join(", ");
        new_inner_html +=
        `
        <div class="mealItem">
        <p id="meal-item-name">${meal}<br><br>${ingredients}</p>
        <div class="actionsContainer">
        <button onclick="editMeal(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
        <button onclick="deleteMeal(${i})"><i class="fa-solid fa-trash"></i></button>
        
        </div>
        </div>
        `
    }
    mainContainer.innerHTML = new_inner_html;
    saveData();
}

paintUI();


// Add new meal idea
function addMeal() {
    let currentMealName = mealInput.value;
    if (!currentMealName) {return};
    let newMeal = {
        mealName: currentMealName,
        ingredients: []
    }
    meals.push(newMeal);
    mealInput.value = "";
    paintUI();
}

document.getElementById("add-btn").addEventListener("click", addMeal);


// Delete a meal idea
function deleteMeal(index) {
    meals.splice(index, 1);
    paintUI();
}


// Edit a meal idea
function editMeal(index) {
    let currentMeal = meals[index];
    mealInput.value = currentMeal.mealName;
    inputContainer.style.display = "grid";
    deleteMeal(index);
}

// Step 5: Persist all info
function saveData() {
    localStorage.setItem("meals", JSON.stringify({meals}));
}


const mealsNumber = document.getElementById("meals-number");

const dailyMeals = [
    document.getElementById("first-meal"),
    document.getElementById("second-meal"),
    document.getElementById("third-meal"),
    document.getElementById("fourth-meal"),
    document.getElementById("fifth-meal"),
    document.getElementById("sixth-meal"),
    document.getElementById("seventh-meal")
];

const mealIngredients = [
    document.getElementById("first-ingredients"),
    document.getElementById("second-ingredients"),
    document.getElementById("third-ingredients"),
    document.getElementById("fourth-ingredients"),
    document.getElementById("fifth-ingredients"),
    document.getElementById("sixth-ingredients"),
    document.getElementById("seventh-ingredients")
];

const addIcon = document.getElementById("add-icon");
const inputContainer = document.getElementById("inputContainer");

function revealInputContainer() {
    addIcon.style.display = "none";
    inputContainer.style.display = "grid";
}

addIcon.addEventListener("click", revealInputContainer)





/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    // document.getElementById("main").style.paddingLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }