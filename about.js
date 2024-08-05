// Open and close sidebar
const homepageBody = document.querySelector(".container");
const homepageHeader = document.querySelector("header");
const sidebar = document.getElementById("mySidebar");

function openNav() {
    sidebar.style.width = "250px";
    homepageBody.style.opacity = "0.3";
    homepageHeader.style.opacity = "0.3";
  }
  

  function closeNav() {
    sidebar.style.width = "0";
    document.getElementById("navbar").style.marginLeft = "0";
    homepageBody.style.opacity = "1";
    homepageHeader.style.opacity = "1";
  }

  $(document).ready(function() {
    if (mySidebar.style.width !== "0")
    {
        $('body').click((event) =>
        {
            if (event.target.id !== 'mySidebar' && event.target.id !== 'openbtn')
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

function fadeInMeals() {
    dailyMeals.forEach(mealElement => {
        fadeIn(mealElement);
    });
    mealIngredients.forEach(ingrElement => {
        fadeIn(ingrElement);
    });
}