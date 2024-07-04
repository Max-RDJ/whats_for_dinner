// Create array of meals with subarrays of ingredients
const charImage = '<img id="char" src="https://drive.google.com/thumbnail?id=1CbV--Oogrro5joi_tY3XMg_7r5GLoLJV" width="18px">'
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
    let mealInput = document.getElementById("mealInput");
    let meal_list = localStorage.getItem("meals") ? JSON.parse(localStorage.getItem("meals")).meals : ["sd"];

function paintUI() {
    let new_inner_html = "";
    for (let i = 0; i < meals.length; i++) {
        const meal = meals[i].mealname;
        new_inner_html +=
        `
        <div class="mealItem">
        <p>${meal}</p>
        <div class="actionsContainer">
        <button onclick="editMeal(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
        <button onclick="deleteMeal(${i})"><i class="fa-solid fa-trash"></i></button>
        </div>
        </div>
        `
    }
    // mainContainer.innerHTML = new_inner_html;
    saveData();
}

paintUI();


// Create a separate page for managing meal items

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
    let newMeals = meals.filter((current_value, current_index) => {
        return current_index !== index;
    })
    meals = newMeals;
    paintUI()
}


// Edit a meal idea
function editMeal(index) {
    let currentMeal = meals[index];
    mealInput.value = currentMeal;
    deleteMeal(index)
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

// Select random number associated with meal in meals array
function getRandomMeal(availableMeals) {
    let randomMeal = Math.floor(Math.random() * availableMeals.length);
    return availableMeals.splice(randomMeal, 1)[0];
}

function generateMeals() {
    const numbersOfMeals = parseInt(mealsNumber.value);

    let availableMeals = [...meals];

    dailyMeals.forEach(mealElement => {
        mealElement.innerHTML = '';
    });

    mealIngredients.forEach(ingrElement => {
        ingrElement.innerHTML = '';
    });

    // Iterate through number of meals selected from dropdown
    for (i = 0; i < numbersOfMeals; i++){
    if (i < dailyMeals.length) {
        if (availableMeals.length === 0) {
            break;
        }
        let selectedMeal = getRandomMeal(availableMeals);
        dailyMeals[i].innerHTML = selectedMeal.mealName;
        mealIngredients[i].innerHTML = selectedMeal.ingredients.join(", ").toLowerCase();
        // Need to insert non-breaking spaces into ingredient names
    }
    }
}

const genBtn = document.getElementById("generate-btn").addEventListener("click", generateMeals);