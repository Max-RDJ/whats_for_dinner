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
document.querySelectorAll('#numberButtons button').forEach(button => {
    button.addEventListener('click', () => {
        const mealsNumber = parseInt(button.textContent);
        generateMeals(mealsNumber);
        fadeInMeals();
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

    dailyMeals.forEach(mealElement => {
        mealElement.innerHTML = '';
    });

    mealIngredients.forEach(ingrElement => {
        ingrElement.innerHTML = '';
    });

    // Iterate through number of meals selected
    for (i = 0; i < mealsNumber; i++){
    if (i < dailyMeals.length) {
        if (availableMeals.length === 0) {
            break;
        }
        let selectedMeal = getRandomMeal(availableMeals);
        dailyMeals[i].innerHTML = selectedMeal.mealName;
        mealIngredients[i].innerHTML = formatIngredients(selectedMeal.ingredients);
        console.log(dailyMeals[i].innerHTML);
        // Need to insert non-breaking spaces into ingredient names and automatically add to new meals
    }
    }
}


function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    // document.getElementById("main").style.paddingLeft = "250px";
    // document.getElementById("body").style.opacity = "0.5";
  }
  

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    // document.getElementById("body").style.opacity = "1";
  }


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

function fadeInMeals() {
    dailyMeals.forEach(mealElement => {
        fadeIn(mealElement);
    });
    mealIngredients.forEach(ingrElement => {
        fadeIn(ingrElement);
    });
}