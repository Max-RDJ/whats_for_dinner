// Create array of meals with subarrays of ingredients
const charImage = '<img id="char" src="https://drive.google.com/thumbnail?id=1CbV--Oogrro5joi_tY3XMg_7r5GLoLJV" width="18px">';
let meals =  [
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
    mealName: `Chickpea Coconut Curry" + charImage`,
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

// Initialise stuff
    let mainContainer = document.querySelector("main");
    let mealInput = document.getElementById("mealInput");
    let ingredientsInput = document.getElementById("ingredientsInput");
    let meal_list = localStorage.getItem("meals") ? JSON.parse(localStorage.getItem("meals")).meals : ["sd"];

    const mealManagerBody = document.querySelector("body");
    const mealManagerMain = document.querySelector("main");
    const mealManagerHeader = document.querySelector("header");
    const sidebar = document.getElementById("mySidebar");
    const mealManagerTitle = document.getElementById("meal-manager-title");

// Load previously saved meals
loadData();


// Format ingredients text
function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Render saved meals and ingredients to page
function paintUI() {
    let new_inner_html = "";
    for (let i = 0; i < meals.length; i++) {
        let meal = meals[i].mealName;
        let ingredients = capitaliseFirstLetter(meals[i].ingredients.join(", "));
        // let formattedIngredients = capitaliseFirstLetter(ingredients);
        new_inner_html +=
        `
        <div class="draggables-container">
        <div class="mealItem draggable" draggable="true">
        <button id="dragHandle">&#9776;</button>
        <p id="meal-item-name">${meal}</p>
        <p id="meal-item-ingredients">${ingredients}</p>
        <div class="actionsContainer">
        <button onclick="editMeal(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
        <button onclick="deleteMeal(${i})"><i class="fa-solid fa-trash"></i></button>
        </div>
        </div>
        </div>
        `;
    }
    mainContainer.innerHTML = new_inner_html;
    saveData();
    attachDragAndDropHandlers()
}

paintUI();

// Allow user to save manually after changing meal name or ingredients

// function manualSave(index) {
//     console.log("Manual save initialised");
//     let mealItemName = document.getElementById("meal-item-name");
//     let mealItemIngredients = document.getElementById("meal-item-ingredients");

//     let editedMealName = mealItemName.innerText;
//     let editedMealIngredients = mealItemIngredients.innerText;

//     let editedMeal = {
//         mealName: editedMealName,
//         ingredients: editedMealIngredients.split(",").map(ingredient => ingredient.trim())};

//     console.log(editedMeal);

//     meals.push(editedMeal);

//     mealItemName.innerText = editedMealName;
//     mealItemIngredients.innerText = editedMealIngredients;
//     console.log("Added" + JSON.stringify(editedMeal) + "and removed");
//     saveData();
//     // paintUI();
//     deleteMeal(index);
// }



// Fade in elements on page
function fadeIn(element, delay) {
    let opacity = 0;
    element.style.opacity = opacity;
    setTimeout(() => {
    mealManagerMain.style.display = "flex";
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

window.onload = fadeIn(mealManagerTitle);

document.getElementById("body").onload = function fadeInMeals() {
    const mealItems = document.querySelectorAll(".mealItem");
    if (mealItems.length > 0) {
        mealItems.forEach((meal_item, index) => { 
            fadeIn(meal_item, index * 100);            
        });
    } else {
        console.error("No elements to fade in found.");
    }
}

// Open and close sidebar
let navOpened = false;
function openNav() {
    navOpened = true;
    sidebar.style.width = "250px";
    mealManagerMain.style.opacity = "0.3";
    mealManagerHeader.style.opacity = "0.3";
    if ($("#inputContainer").is(":visible")) {
    $("#inputContainer").slideToggle(300);
    addIconSpin(); }
  };

  function closeNav() {
    navOpened = false;
    sidebar.style.width = "0";
    mealManagerBody.style.marginLeft = "0";
    mealManagerMain.style.opacity = "1";
    mealManagerHeader.style.opacity = "1";
  };

// Add new meal idea
function addMeal() {
    let currentMealName = mealInput.value;
    if (!currentMealName) {return};
    let newMealIngredients = ingredientsInput.value.split(',').map(ingredient => ingredient.trim());
    let newMeal = {
        mealName: currentMealName,
        ingredients: newMealIngredients
    };
    meals.unshift(newMeal);
    mealInput.value = "";
    ingredientsInput.value = "";
    paintUI();
    // location.reload();
}

document.getElementById("add-btn").addEventListener("click",() => {
    addMeal();
    addIconSpin();
    $("#inputContainer").slideToggle(300);
});

// Delete a meal idea
function deleteMeal(index) {
    var result = confirm("Are you sure?")
    if (!navOpened) {
        if (result) {
            meals.splice(index, 1);
            saveData();
            paintUI();
            // location.reload();
        }         
    }
};

// Edit a meal idea
function editMeal(index) {
    if (navOpened == false) {
    addIconSpin();
    let currentMeal = meals[index];
    mealInput.value = currentMeal.mealName;
    ingredientsInput.value = currentMeal.ingredients;
    $("#inputContainer").slideToggle(300);
    deleteMeal(index);
    }
};

// Persist new meals across page visits
function saveData() {
    localStorage.setItem("meals", JSON.stringify(meals));
    console.log("Data saved:", meals);
}

function loadData() {
    let storedData = localStorage.getItem("meals");
    if (storedData) {
        console.log("Found data")
        meals = JSON.parse(storedData);
        console.log("Parsed meals data:", meals)
        paintUI();
    }
    else {
        console.log("No data found in localStorage, using default meals.");
    }
}


let mealsNumber = document.getElementById("meals-number");

let dailyMeals = [
    document.getElementById("first-meal"),
    document.getElementById("second-meal"),
    document.getElementById("third-meal"),
    document.getElementById("fourth-meal"),
    document.getElementById("fifth-meal"),
    document.getElementById("sixth-meal"),
    document.getElementById("seventh-meal")
];

let mealIngredients = [
    document.getElementById("first-ingredients"),
    document.getElementById("second-ingredients"),
    document.getElementById("third-ingredients"),
    document.getElementById("fourth-ingredients"),
    document.getElementById("fifth-ingredients"),
    document.getElementById("sixth-ingredients"),
    document.getElementById("seventh-ingredients")
];


// Open input panel for user to enter new meals
const addIcon = document.getElementById("add-icon");
const inputContainer = document.getElementById("inputContainer");

let rotator = document.querySelector(".rotate");
rotator.addEventListener("click", addIconSpin);
let current_rotation = 0;

function addIconSpin()
{
    if (current_rotation == 0)
    {
        current_rotation += 135;
        rotator.style.transform = 'rotate(' + current_rotation + 'deg)';
        document.getElementById("open-meal-adder").style.backgroundColor = "gray";
    }
    else
    {
        current_rotation -= 135;
        rotator.style.transform = 'rotate(' + current_rotation + 'deg)';
        document.getElementById("open-meal-adder").style.backgroundColor = "var(--accent-color)";
        document.getElementById("mealInput").value = "";
        document.getElementById("ingredientsInput").value = "";
    }
};

$(document).ready(function() {
    if (sidebar.style.width !== "0")
    {
        $('body').click((event) =>
        {
            if (!event.target.closest("#mySidebar") && event.target.id !== "hamburger")
            {
                closeNav();
            }
        });
    }
});

$(document).ready(function inputContainerToggle() {
    $("#add-icon").click(function() {
        $("#inputContainer").slideToggle(300);
    })
});


function attachDragAndDropHandlers() {
const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".draggables-container");

draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
    })

    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
    })
})

containers.forEach(container => {
    container.addEventListener("dragover", e => {
        e.preventDefault();
        const draggable = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(container, e.clientY);
        console.log(afterElement);
        if (afterElement == null) {
            container.appendChild(draggable);
        }
        else {
            container.insertBefore(draggable,afterElement);
        }
    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset <  0  && closest.offset) {
            return {offset: offset, element: child};
        }
        else {
            return closest;
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}
}
