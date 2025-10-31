export function toggleTrayInit() {
    const buttonTray = document.querySelector(".button-tray");
    const trayToggle = document.querySelector(".tray-toggle");
    const chevron = document.getElementById("toggle-chevron");

    if (!buttonTray || !trayToggle) return;

    let trayOpen = localStorage.getItem("trayOpen") === "true";

     if (trayOpen) {
        buttonTray.classList.remove("tray-hidden");

    } else {
        buttonTray.classList.add("tray-hidden");
        chevron.classList.add("rotated");
    }

    trayToggle.addEventListener("click", () => {
        trayOpen = !trayOpen;
        buttonTray.classList.toggle("tray-hidden");
        chevron.classList.toggle("rotated");
        localStorage.setItem("trayOpen", trayOpen);
    });
}

toggleTrayInit();
