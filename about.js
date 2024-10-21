// Open and close sidebar
const aboutBody = document.querySelector("main");
const aboutHeader = document.querySelector("header");
const sidebar = document.getElementById("mySidebar");

function openNav() {
    sidebar.style.width = "250px";
    aboutBody.style.opacity = "0.3";
    aboutHeader.style.opacity = "0.3";
  }

  function closeNav() {
    sidebar.style.width = "0";
    document.getElementById("navbar").style.marginLeft = "0";
    aboutBody.style.opacity = "1";
    aboutHeader.style.opacity = "1";
  }

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
    

function fadeIn(element, delay) {
    let opacity = 0;
    element.style.opacity = opacity;
    setTimeout(() => {
        aboutBody.style.display = "block";
        const intervalID = setInterval(() => {
            if (opacity < 1) {
                opacity += 0.03;
                element.style.opacity = opacity;
            } else {
                clearInterval(intervalID);
            }
        }, 40);
    }, delay);
}

window.onload = function fadeInText() {
    const aboutTitle = document.getElementById("about-title");
    const mainText = document.querySelectorAll(".main-text");
    fadeIn(aboutTitle);

    if (mainText.length > 0) { 
            mainText.forEach((textPar, index) => { 
                fadeIn(textPar, index * 100);            
            });
        } else {
            console.error("No elements to fade in found.");
        };
}