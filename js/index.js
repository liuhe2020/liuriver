'use strict';

// Navbar
const navTogglerBtn = document.querySelector('.toggler');
const sidebar = document.querySelector('.sidebar');

navTogglerBtn.addEventListener('click', sideBarTogglerBtn);

function sideBarTogglerBtn() {
  sidebar.classList.toggle('open');
  navTogglerBtn.classList.toggle('open');
}

// Footer
const copyright = document.querySelector('.copyright');

const today = new Date();
const year = today.getFullYear();

copyright.innerText = `© ${year} LIU RIVER PHOTOGRAPHY`;
