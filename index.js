import './utils/toggleTray.js';

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

let meal_list = localStorage.getItem("meals") ? JSON.parse(localStorage.getItem("meals")).meals : ["sd"];
const generatedMeals = document.querySelector(".generated-meals");
const homepageHeader = document.querySelector("header");
const sidebar = document.querySelector(".sidebar");
let storedData = localStorage.getItem("meals");
const dayCards = document.querySelectorAll(".day-card");
const indexPageTitle = document.getElementById("index-page-title");
window.onload = fadeIn(indexPageTitle);

if (storedData) {
    console.log("Found data")
    meals = JSON.parse(storedData);
    console.log("Parsed meals data:", meals)
}

document.getElementById('generate-button').addEventListener('click', () => {
    dailyMeals.forEach(mealElement => {
        mealElement.innerHTML = '';
    });
    mealIngredients.forEach(ingrElement => {
        ingrElement.innerHTML = '';
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
    setTimeout(() => {
        element.style.display = "flex";
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
    let selectedMealsArr = [];

    console.log("Available meals:", availableMeals)

    document.querySelectorAll(".day-of-week").forEach(el => {
        el.style.display = "block";
    });

    for (let i = 0; i < mealsNumber; i++) {
        if (i < dailyMeals.length) {
            if (availableMeals.length === 0) break;
            let selectedMeal = getRandomMeal(availableMeals);

            if (selectedMeal) {
                selectedMealsArr.push(selectedMeal);
                if (dailyMeals[i] && mealIngredients[i]) {
                    dailyMeals[i].innerHTML = selectedMeal.mealName;
                    mealIngredients[i].innerHTML = formatIngredients(selectedMeal.ingredients);
            }
        }
    }

    if (selectedMealsArr.length > 0) {
        selectedMealsArr.forEach((selectedMeal, index) => {
            dayCards[index].style.opacity = "0";
            setTimeout(() => {
                fadeIn(dayCards[index]);
            }, index * 75);
        });
        } else {
            console.error("No elements to fade in found.");
        }
    }
}


function openNav() {
    sidebar.style.width = "250px";
    generatedMeals.style.opacity = "0.3";
    homepageHeader.style.opacity = "0.3";
}

function closeNav() {
    sidebar.style.width = "0px";
    generatedMeals.style.opacity = "1";
    homepageHeader.style.opacity = "1";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".sidebar-hamburger")?.addEventListener("click", openNav);
  document.querySelector(".closebtn")?.addEventListener("click", closeNav);
});

  $(document).ready(function() {
    if (sidebar.style.width !== "0")
    {
        $('body').click((event) =>
        {
            if (!event.target.closest(".sidebar") && !event.target.closest('.sidebar-hamburger'))
            {
                closeNav();
            }
        });
    }
});

// EXPORT
document.querySelector(".export-button").addEventListener("click", () => {
    const map = [
        ["mon", "first"],
        ["tue", "second"],
        ["wed", "third"],
        ["thu", "fourth"],
        ["fri", "fifth"],
        ["sat", "sixth"],
        ["sun", "seventh"]
      ];
      
    const meals = Object.fromEntries(
        map.map(([day, id]) => [
            day,
            {
            name: document.getElementById(`${id}-meal`).textContent,
            ingredients: document.getElementById(`${id}-ingredients`).textContent
            }
        ])
    );
  
    const blob = new Blob(
      [JSON.stringify(meals, null, 2)],
      { type: "application/json" }
    );
  
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "meal-plan.json";
    a.click();
  
    URL.revokeObjectURL(url);
});
  
// IMPORT
const importBtn = document.querySelector(".import-button");
const fileInput = document.getElementById("import-file");

importBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = e => {
    const meals = JSON.parse(e.target.result);

    const map = [
        ["mon", "first"],
        ["tue", "second"],
        ["wed", "third"],
        ["thu", "fourth"],
        ["fri", "fifth"],
        ["sat", "sixth"],
        ["sun", "seventh"]
    ];
      
    map.forEach(([day, id]) => {
        document.getElementById(`${id}-meal`).textContent =
            meals[day]?.name ?? "";
        document.getElementById(`${id}-ingredients`).textContent =
            meals[day]?.ingredients ?? "";
        });
    }

  reader.readAsText(file);
});
