// Navbar
const navTogglerBtn = document.querySelector(".toggler");
const sidebar = document.querySelector(".sidebar");

navTogglerBtn.addEventListener("click", sideBarTogglerBtn);

function sideBarTogglerBtn() {
  sidebar.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
}
