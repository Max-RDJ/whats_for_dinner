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

// Select random number associated with meal in meals array
// Create loop for number of meals selected from dropdown
mealsNumber = document.getElementById("meals-number");

const dailyMeals = [
    document.getElementById("first-meal"),
    document.getElementById("second-meal"),
    document.getElementById("third-meal"),
    document.getElementById("fourth-meal"),
    document.getElementById("fifth-meal"),
    document.getElementById("sixth-meal"),
    document.getElementById("seventh-meal")
];

for (i = 0; i < mealsNumber; i++){
    function getRandomMeal() {
        let j = Math.floor(Math.random() * meals.length)
        for (k = 0; k < dailyMeals.length; k++) {
            dailyMeals[k].innerHTML = meals[j];
        }
    }
}

getRandomMeal()

// Add meal name to output in HTML
// Increase number each time in for loop in order to move on to next row of text


firstMeal.innerText = meals[j]