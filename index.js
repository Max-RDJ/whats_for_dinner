// Create array of meals with subarrays of ingredients
const charImage = '<img id="char" src="https://drive.google.com/thumbnail?id=1CbV--Oogrro5joi_tY3XMg_7r5GLoLJV" width="18px">'

let meals =  [
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
    mealName: `Chickpea Coconut Curry`,
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
    },
    {
    mealName: "Test",
    ingredients: [
        "test"
    ]
    },
    {
    mealName: "Test2",
    ingredients: [
    "test2"
    ]
    },
    {
    mealName: "Test3",
    ingredients: [
    "test3"
    ]
    }
]

// Initialise
    let mealInput = document.getElementById("mealInput");
    let meal_list = localStorage.getItem("meals") ? JSON.parse(localStorage.getItem("meals")).meals : ["sd"];


// Event listeners for buttons
document.getElementById('index-page-title').addEventListener('click', () => {
    dailyMeals.forEach(mealElement => {
        mealElement.innerHTML = '';
        mealElement.style.opacity = 0;
    });
    mealIngredients.forEach(ingrElement => {
        ingrElement.innerHTML = '';
        ingrElement.style.opacity = 0;
    });
    generateMeals(7);
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


function fadeIn(element, delay) {
    let opacity = 0;
    element.style.opacity = opacity;
    setTimeout(() => {
    element.style.display = "block";
    const intervalID = setInterval(() => {
        if (opacity < 1) {
            opacity += 0.03;
            element.style.opacity = opacity;
        } else {
            clearInterval(intervalID);
        }
    }, 20);
}, delay);
}


function getRandomMeal(availableMeals) {
    let randomMeal = Math.floor(Math.random() * availableMeals.length);
    return availableMeals.splice(randomMeal, 1)[0];
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function formatIngredients(ingredients) {
    return ingredients.map((ingredient, index) => {
        if (index === 0) {
            return capitaliseFirstLetter(ingredient);
        }
        return ingredient.toLowerCase();
    }).join(", ");
}


function generateMeals(mealsNumber) {
    let availableMeals = [...meals];
    let selectedMealsArr = []

    for (let i = 0; i < mealsNumber; i++) {
        if (i < dailyMeals.length) {
            
            if (availableMeals.length === 0) break;
            let selectedMeal = getRandomMeal(availableMeals);
            selectedMealsArr.push(selectedMeal);

            dailyMeals[i].innerHTML = selectedMeal.mealName;
            mealIngredients[i].innerHTML = formatIngredients(selectedMeal.ingredients);

            console.log("Meal: ", selectedMeal.mealName);
        }
    }

    if (selectedMealsArr.length > 0) {
                selectedMealsArr.forEach((selectedMeal, index) => { 
                    setTimeout(() => {
                        fadeIn(dailyMeals[index]);
                        fadeIn(mealIngredients[index]);
                    }, index * 100);             
                });
            } else {
                console.error("No elements to fade in found.");
            } 
}



// Open and close sidebar
const homepageBody = document.querySelector("#index-main-content");
const homepageHeader = document.querySelector("header");
const sidebar = document.getElementById("mySidebar");

function openNav() {
    sidebar.style.width = "250px";
    homepageBody.style.opacity = "0.3";
    homepageHeader.style.opacity = "0.3";
  }

function closeNav() {
    sidebar.style.width = "0px";
    homepageBody.style.opacity = "1";
    homepageHeader.style.opacity = "1";
  }

  $(document).ready(function() {
    if (sidebar.style.width !== "0")
    {
        $('body').click((event) =>
        {
            if (event.target.id !== 'sidebar' && event.target.id !== 'openbtn')
            {
                closeNav();
                console.log("outside")
            }
            else
            {
                console.log("inside");
            }
        });
    }
});


function fadeIn(element) {
    let opacity = 0;
    element.style.opacity = opacity;
    const intervalID = setInterval(() => {
        if (opacity < 1) {
            opacity += 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(intervalID);
        }
    }, 50);
}

const indexPageTitle = document.getElementById("index-page-title");
window.onload = fadeIn(indexPageTitle);