const sidepanel = document.getElementById("side-panel");

/* Set the width of the sidebar to 250px (show it) */
openNav = () => {
    sidepanel.style.width = "250px";
};
  
  /* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
    sidepanel.style.width = "0";
};

document.querySelector('.open-btn').addEventListener('click', openNav);
document.querySelector('.close-btn').addEventListener('click', closeNav);