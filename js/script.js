// Navbar
const navTogglerBtn = document.querySelector(".toggler");
const sidebar = document.querySelector(".sidebar");

navTogglerBtn.addEventListener("click", sideBarTogglerBtn);

function sideBarTogglerBtn() {
  sidebar.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
}

// Gallery
let galleryImages = document.querySelectorAll(".gallery-cell");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

galleryImages.forEach(function (image, index) {
  image.onclick = function () {
    getLatestOpenedImg = index + 1;

    let container = document.body;
    let newImgWindow = document.createElement("div");
    container.appendChild(newImgWindow);
    newImgWindow.setAttribute("class", "img-window");
    newImgWindow.setAttribute("onclick", "closeImg()");

    let newImg = image.firstElementChild.cloneNode();
    newImgWindow.appendChild(newImg);
    newImg.classList.remove("gallery-img");
    newImg.classList.add("popup-img");
    newImg.setAttribute("id", "current-img");

    newImg.onload = function () {
      let newNextBtn = document.createElement("a");
      newNextBtn.innerHTML = '<i class="fas fa-chevron-right next"></i>';
      container.appendChild(newNextBtn);
      newNextBtn.setAttribute("class", "img-btn-next");
      newNextBtn.setAttribute("onclick", "changeImg(1)");

      let newPrevBtn = document.createElement("a");
      newPrevBtn.innerHTML = '<i class="fas fa-chevron-left next"></i>';
      container.appendChild(newPrevBtn);
      newPrevBtn.setAttribute("class", "img-btn-prev");
      newPrevBtn.setAttribute("onclick", "changeImg(0)");
    };
  };
});

function closeImg() {
  document.querySelector(".img-window").remove();
  document.querySelector(".img-btn-next").remove();
  document.querySelector(".img-btn-prev").remove();
}

function changeImg(change) {
  document.querySelector("#current-img").remove();

  let getImgWindow = document.querySelector(".img-window");
  let newImg = document.createElement("img");
  getImgWindow.appendChild(newImg);

  let calcNewImg;
  if (change === 1) {
    calcNewImg = getLatestOpenedImg + 1;
    if (calcNewImg > galleryImages.length) {
      calcNewImg = 1;
    }
  } else if (change === 0) {
    calcNewImg = getLatestOpenedImg - 1;
    if (calcNewImg < 1) {
      calcNewImg = galleryImages.length;
    }
  }

  newImg.setAttribute(
    "src",
    "img/portfolio/liuriver-actor-headshot-" + calcNewImg + ".jpg"
  );
  newImg.setAttribute("class", "popup-img");
  newImg.setAttribute("id", "current-img");

  getLatestOpenedImg = calcNewImg;
}

// Form
const form = document.querySelector(".contact-form");
const fullName = document.querySelector("#fullname");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");

form.addEventListener("keyup", (e) => {
  if (
    e.target.id === "fullname" ||
    e.target.id === "subject" ||
    e.target.id === "message"
  ) {
    e.target.value.trim().length < 4
      ? hideIcon(e.target)
      : showSuccess(e.target);
  } else if (e.target.id === "email") {
    e.target.value.trim().length < 6 || !validateEmail(email.value)
      ? hideIcon(e.target)
      : showSuccess(e.target);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (fullName.value.trim().length < 4) {
    showError(fullName);
  } else if (subject.value.trim().length < 4) {
    showError(subject);
  } else if (message.value.trim().length < 4) {
    showError(message);
  } else if (email.value.trim().length < 6 || !validateEmail(email.value)) {
    showError(email);
  } else {
    e.currentTarget.submit();
  }
});

function showSuccess(input) {
  input.parentElement.className = "field success";
}

function hideIcon(input) {
  input.parentElement.className = "field";
}

function showError(input) {
  input.parentElement.className = "field error";
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}
