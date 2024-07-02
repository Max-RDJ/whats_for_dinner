// Create array of meals with subarrays of ingredients
const meals =  [
    {
    mealName: "Thai Green Curry",
    ingredients: [
        "Thai green paste",
        "Chickpeas",
        "Coconut milk",
        "Tenderstem broccoli",
        "Rice"
    ]
    },
    {
    mealName: "Chickpea Coconut Curry",
    ingredients: [
        "Chickpeas",
        "Coconut milk",
        "Passata",
        "Bell pepper"
    ]
    },
    {
    mealName: "Spaghetti and Meatballs",
    ingredients: [
        "Spaghetti",
        "Bolognese sauce",
        "Meatballs"
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
        const meal = meals[i];
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


// Add new meal idea
function addMeal() {
    let current_meal = mealInput.value;
    if (!current_meal) {return};
    meals.push(current_meal);
    mealInput.value = "";
    paintUI();
}

document.getElementById("add-btn").addEventListener("click", addMeal);


// Delete a meal idea
function deleteMeal(index) {
    let new_meals = meals.filter((current_value, current_index) => {
        return current_index !== index;
    })
    meals = new_meals;
    paintUI()
}


// Edit a meal idea
function editMeal(index) {
    let current_meal = meals[index];
    mealInput.value = current_meal;
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

    // Iterate through number of meals selected from dropdown
    for (i = 0; i < numbersOfMeals; i++){
    if (i < dailyMeals.length) {
        if (availableMeals.length === 0) {
            break;
        }
        let selectedMeal = getRandomMeal(availableMeals);
        dailyMeals[i].innerHTML = selectedMeal.mealName; 
    }
    }
}

const genBtn = document.getElementById("generate-btn").addEventListener("click", generateMeals);

// Add meal name to output in HTML
// Increase number each time in for loop in order to move on to next row of text