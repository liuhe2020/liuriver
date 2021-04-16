"use strict";

const galleryImages = document.querySelectorAll(".gallery-cell");
const galleryContainer = document.querySelector(".gallery");
const bodyContainer = document.body;
let imageIndex;

// Create lightbox component and inject it to the body on click event
galleryContainer.addEventListener("click", (e) => {
  // Reconstruct array of images based on click event
  const targetImage = e.target.parentElement;
  const imageArray = Array.from(targetImage.parentElement.children);
  // Get index of current pop-up image
  imageIndex = imageArray.indexOf(targetImage) + 1;

  // Create html elements within lightbox component
  const bgLayer = document.createElement("div");
  const imageContainer = document.createElement("div");
  const popUpImage = e.target.cloneNode();
  const nextBtn = document.createElement("a");
  const prevBtn = document.createElement("a");
  const exitBtn = document.createElement("a");
  const zoomBtn = document.createElement("a");

  bodyContainer.appendChild(bgLayer);
  imageContainer.appendChild(popUpImage);
  bgLayer.append(imageContainer, nextBtn, prevBtn, exitBtn, zoomBtn);

  nextBtn.innerHTML =
    '<span class="material-icons img-btn-next">chevron_right</span>';
  prevBtn.innerHTML =
    '<span class="material-icons img-btn-prev">chevron_left</span>';
  exitBtn.innerHTML = '<span class="material-icons img-btn-exit">close</span>';
  zoomBtn.innerHTML = '<span class="material-icons img-btn-zoom">search</span>';

  // Add CSS class to new elements
  bgLayer.className = "popup-bg";
  imageContainer.className = "popup-container";
  popUpImage.className = "popup-img";
});

// Listen to click events on document and utilise event bubbling to select JS injected elements from other functions
document.addEventListener("click", (e) => {
  const targetClass = e.target.classList;

  if (targetClass.contains("img-btn-next")) {
    changeImage("next");
  } else if (targetClass.contains("img-btn-prev")) {
    changeImage("prev");
  } else if (targetClass.contains("img-btn-zoom")) {
    zoomImage();
  } else if (
    targetClass.contains("img-btn-exit") ||
    targetClass.contains("popup-bg")
  ) {
    closePopUp();
  }
});

document.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("zoom")) {
    dragImage(e);
  }
});

function dragImage(e) {
  // Get pop-up image's container which has the absolute XY coordinates
  const imageZoomed = document.querySelector(".popup-container");
  const imageRect = imageZoomed.getBoundingClientRect();

  // calculate offset
  const shiftX = e.clientX - imageRect.left - imageZoomed.offsetWidth / 2;
  const shiftY = e.clientY - imageRect.top - imageZoomed.offsetHeight / 2; // popup-container has top: 50%, hence the reset

  // Referencing with imageRect does not work in the function below but somehow imageZoomed.getBoundingClientRect() does
  function moveImage(e) {
    // Set image's absolute position to cursor position
    imageZoomed.style.top = e.clientY - shiftY + "px";
    // Set constraints for image dragging vertically
    if (imageZoomed.getBoundingClientRect().top >= 0) {
      imageZoomed.style.top =
        e.clientY - shiftY - imageZoomed.getBoundingClientRect().top + "px";
    } else if (
      imageZoomed.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      imageZoomed.style.top =
        e.clientY -
        shiftY +
        (window.innerHeight - imageZoomed.getBoundingClientRect().bottom) +
        "px";
    }
    // Add constaints for dragging horizontally in smaller viewport
    else if (window.innerWidth < 900) {
      imageZoomed.style.left = e.clientX - shiftX + "px";
      if (imageZoomed.getBoundingClientRect().left >= 0) {
        imageZoomed.style.left =
          e.clientX - shiftX - imageZoomed.getBoundingClientRect().left + "px";
      } else if (
        imageZoomed.getBoundingClientRect().right <= window.innerWidth
      ) {
        imageZoomed.style.left =
          e.clientX -
          shiftX +
          (window.innerWidth - imageZoomed.getBoundingClientRect().right) +
          "px";
      }
    }
  }

  document.addEventListener("mousemove", moveImage);

  // Remove the mousemove listener to stop image moving with cursor
  imageZoomed.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", moveImage);
  });

  // Disable HTML default dragging effect
  imageZoomed.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });
}

function zoomImage() {
  document.querySelector(".popup-img").classList.toggle("zoom");
  // Re-center the image container
  document.querySelector(".popup-container").style.top = "50%";
  document.querySelector(".popup-container").style.left = "50%";
}

function closePopUp() {
  document.querySelector(".popup-bg").remove();
}

function changeImage(change) {
  // Re-create pop-up image and its container
  const newImage = document.createElement("img");
  const newImageContainer = document.querySelector(".popup-container");

  // Remove current pop-up image
  document.querySelector(".popup-img").remove();
  // Add new pop-up image to its new container
  newImageContainer.appendChild(newImage);
  // Re-center the new image container
  newImageContainer.style.top = "50%";
  newImageContainer.style.left = "50%";

  // Set arguments for the change
  let newImageIndex;
  if (change === "next") {
    newImageIndex = imageIndex + 1;
    // when gallery reaches the end, set next image to the beginning
    if (newImageIndex > galleryImages.length) {
      newImageIndex = 1;
    }
  } else if (change === "prev") {
    newImageIndex = imageIndex - 1;
    // when gallery reaches the begnning, set prev image to the end
    if (newImageIndex < 1) {
      newImageIndex = galleryImages.length;
    }
  }

  newImage.className = "popup-img";
  newImage.setAttribute(
    "src",
    `img/portfolio/liuriver-actor-headshot-${newImageIndex}.jpg`
  );

  // Set index of the re-created pop-up image to match its file name
  imageIndex = newImageIndex;
}
