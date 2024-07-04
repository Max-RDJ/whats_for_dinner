// Create array of meals with subarrays of ingredients
const charImage = '<img id="char" src="https://drive.google.com/thumbnail?id=1CbV--Oogrro5joi_tY3XMg_7r5GLoLJV" width="18px">'
const meals =  [
    {
    mealName: "Thai Green Curry",
    ingredients: [
        "thai green paste",
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
    mealName: "Stir Fry",
    ingredients: [
        "fake chicken",
        "bell pepper",
        "noodles",
        "teryaki sauce"
    ]
    }
]

// Initialise
    let mealInput = document.getElementById("mealInput");
    let meal_list = localStorage.getItem("meals") ? JSON.parse(localStorage.getItem("meals")).meals : ["sd"];

// function paintUI() {
//     let new_inner_html = "";
//     for (let i = 0; i < meals.length; i++) {
//         const meal = meals[i].mealname;
//         new_inner_html +=
//         `
//         <div class="mealItem">
//         <p>${meal}</p>
//         <div class="actionsContainer">
//         <button onclick="editMeal(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
//         <button onclick="deleteMeal(${i})"><i class="fa-solid fa-trash"></i></button>
//         </div>
//         </div>
//         `
//     }
//     // mainContainer.innerHTML = new_inner_html;
//     saveData();
// }

// paintUI();



// Event listeners for buttons
document.querySelectorAll('#numberButtons button').forEach(button => {
    button.addEventListener('click', () => {
        const mealsNumber = parseInt(button.textContent);
        generateMeals(mealsNumber);
    });
});


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

function generateMeals(mealsNumber) {
    let availableMeals = [...meals];

    dailyMeals.forEach(mealElement => {
        mealElement.innerHTML = '';
    });

    mealIngredients.forEach(ingrElement => {
        ingrElement.innerHTML = '';
    });

    // Iterate through number of meals selected from dropdown
    for (i = 0; i < mealsNumber; i++){
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

// const genBtn = document.getElementById("generate-btn").addEventListener("click", generateMeals);


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


/* TODO:
- Add number buttons to replace dropdown
- Add animation to appearing meals
- Make navbar 100% height of 
*/