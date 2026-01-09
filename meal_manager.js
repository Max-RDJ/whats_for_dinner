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
    mealName: "Chickpea Coconut Curry",
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
    mealName: "Spanish Chickpeas and Potato",
    ingredients: [
        "potato",
        "bell pepper",
        "chickpeas",
        "tinned tomato",
        "carrot",
        "olive oil"
    ]
    },
    {
    mealName: "Sausage & Mash",
    ingredients: [
        "sausage",
        "potato",
        "peas",
        "butter",
        "milk"
    ]
    },
    {
    mealName: "Beans on Toast",
    ingredients: [
        "baked beans",
        "bread",
        "butter"
    ]
    }
]

let mainContainer = document.querySelector("main");
let mealList = localStorage.getItem("meals") ? JSON.parse(localStorage.getItem("meals")).meals : ["sd"];

const mealManagerBody = document.querySelector("body");
const mealManagerMain = document.querySelector("main");
const mealManagerHeader = document.querySelector("header");
const sidebar = document.querySelector(".sidebar");
const mealManagerTitle = document.getElementById("meal-manager-title");

loadData();

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function paintUI() {
    let new_inner_html = "";
    for (let i = 0; i < meals.length; i++) {
        let meal = meals[i].mealName;
        let ingredients = meals[i].ingredients ? capitaliseFirstLetter(meals[i].ingredients.join(", ")) : "No ingredients";
        new_inner_html +=
        `
        <div class="draggables-container">
            <table class="meal-item draggable" draggable="true">
                <tbody>
                    <tr>
                        <td>
                            <button class="drag-handle">&#9776;</button>
                        </td>
                        <td class="meal-details">
                            <div class="meal-row">
                                <input onclick="makeMealEditable(${i}, 'mealName')"class="input__meal-title meal-input" id="meal-item-name-${i}" type="text" value="${meal}">
                                <button type="button" onclick="makeMealEditable(${i}, 'mealName')" class="action-icon">
                                    <i class="fa-solid fa-pen-to-square edit-icon"></i>
                                </button>
                            </div>
                            <div class="meal-row">
                                <input onclick="makeMealEditable(${i}, 'ingredients')"class="input__meal-ingredients" id="meal-item-ingredients-${i}" type="text" value="${ingredients}">
                                <button type="button" onclick="makeMealEditable(${i}, 'ingredients')" class="action-icon">
                                    <i class="fa-solid fa-pen-to-square edit-icon"></i>
                                </button>
                            </div>
                        </td>
                        <td>
                            <div class="actions-container">
                                <button onclick="deleteMeal(${i})" class="action-icon"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        `;
    }
    mainContainer.innerHTML = new_inner_html;
    attachDragAndDropHandlers()
}

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
    const mealItems = document.querySelectorAll(".meal-item");
    if (mealItems.length > 0) {
        mealItems.forEach((meal_item, index) => { 
            fadeIn(meal_item, index * 100);            
        });
    } else {
        console.error("No elements to fade in found.");
    }
}

let navOpened = false;
function openNav() {
    navOpened = true;
    sidebar.style.width = "250px";
    mealManagerMain.style.opacity = "0.3";
    mealManagerHeader.style.opacity = "0.3";
    if ($("#meal-manager__button-tray").is(":visible")) {
        $("#meal-manager__button-tray").slideToggle(300);
    }
  };

function closeNav() {
    navOpened = false;
    sidebar.style.width = "0";
    mealManagerBody.style.marginLeft = "0";
    mealManagerMain.style.opacity = "1";
    mealManagerHeader.style.opacity = "1";
  };

function addMeal() {
    let currentMealName = mealInput.value;
    if (!currentMealName) return;

    let newMealIngredients = ingredientsInput.value
        .split(',')
        .map(i => i.trim());

    meals.unshift({
        mealName: currentMealName,
        ingredients: newMealIngredients
    });

    saveData();
    paintUI();

    mealInput.value = "";
    ingredientsInput.value = "";
}

const addIcon = document.getElementById("add-icon");
const rotator = document.querySelector(".rotate");
const mealManagerButtonTray = $("#meal-manager__button-tray");
const mealInput = document.getElementById("meal-input");
let ingredientsInput = document.getElementById("ingredients-input");
let currentRotation = 0;
let isMenuOpen = false;

function toggleMealTray(clearInputs = false) {
    currentRotation = currentRotation === 0 ? 135 : 0;
    rotator.style.transform = `rotate(${currentRotation}deg)`;

    document.getElementById("open-meal-adder").style.backgroundColor =
        currentRotation === 0 ? "var(--accent-color)" : "gray";

    if (clearInputs) {
        mealInput.value = "";
        ingredientsInput.value = "";
    }

    mealManagerButtonTray.slideToggle(300);
}

addIcon.addEventListener("click", () => {
    toggleMealTray(true);
});

function deleteMeal(index) {
    var result = confirm("Are you sure you want to delete this meal idea?")
    if (!navOpened) {
        if (result) {
            meals.splice(index, 1);
            saveData();
            paintUI();
        }
    }
};

function makeMealEditable(index, type) {
    const mealNameInput = document.getElementById(`meal-item-name-${index}`);
    const ingredientsInput = document.getElementById(`meal-item-ingredients-${index}`);

    let inputToEdit;
    if (type === "mealName") inputToEdit = mealNameInput;
    else inputToEdit = ingredientsInput;

    inputToEdit.removeAttribute("readonly");
    inputToEdit.focus();
    inputToEdit.select();

    function keyHandler(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            saveEditedMeal(inputToEdit, index, type, keyHandler);
            inputToEdit.blur();
        }
    }

    function blurHandler() {
        saveEditedMeal(inputToEdit, index, type, keyHandler);
    }

    inputToEdit.addEventListener("keydown", keyHandler);
    inputToEdit.addEventListener("blur", blurHandler);
}

function saveEditedMeal(inputToEdit, index, type, handler) {
    if (type === "mealName") {
        meals[index].mealName = inputToEdit.value;
    } else {
        meals[index].ingredients = inputToEdit.value
            .split(",")
            .map(i => i.trim());
    }

    saveData();
    inputToEdit.setAttribute("readonly", true);
    inputToEdit.removeEventListener("keydown", handler);
}


function saveData() {
    localStorage.setItem("meals", JSON.stringify(meals));
    console.log("Saved:", meals);
}


function loadData() {
    const storedData = localStorage.getItem("meals");
    if (storedData) {
        meals = JSON.parse(storedData);

    }
    paintUI();
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
