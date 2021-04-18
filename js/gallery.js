"use strict";

const galleryImages = document.querySelectorAll(".gallery-cell");
const galleryContainer = document.querySelector(".gallery");
const bodyContainer = document.body;
let imageIndex;

// Create lightbox component and inject it to the body on click event
galleryContainer.addEventListener("click", (e) => {
  // Check if clicked on an image not blank space
  if (e.target.classList.contains("gallery-img")) {
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
    exitBtn.innerHTML =
      '<span class="material-icons img-btn-exit">close</span>';
    zoomBtn.innerHTML =
      '<span class="material-icons img-btn-zoom">search</span>';

    // Add CSS class to new elements
    bgLayer.className = "popup-bg";
    imageContainer.className = "popup-container";
    popUpImage.className = "popup-img";

    // Listen to click events on pop up window and utilise event bubbling to select JS injected elements
    bgLayer.addEventListener("click", (e) => {
      const targetClass = e.target.classList;

      if (targetClass.contains("img-btn-next")) {
        changeImage("next", imageContainer);
      } else if (targetClass.contains("img-btn-prev")) {
        changeImage("prev", imageContainer);
      } else if (targetClass.contains("img-btn-zoom")) {
        zoomImage(imageContainer);
      } else if (
        targetClass.contains("img-btn-exit") ||
        targetClass.contains("popup-bg")
      ) {
        closePopUp(bgLayer);
      }
    });

    imageContainer.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("zoom")) {
        triggerMove(e, imageContainer);
      }
    });
    imageContainer.addEventListener("touchstart", (e) => {
      if (e.target.classList.contains("zoom")) {
        triggerMove(e, imageContainer);
      }
    });
  }
});

function triggerMove(e, imageContainer) {
  // calculate offset for both cursor and touch
  const shiftX =
    (e.clientX || e.touches[0].clientX) -
    imageContainer.getBoundingClientRect().left -
    imageContainer.offsetWidth / 2;

  const shiftY =
    (e.clientY || e.touches[0].clientY) -
    imageContainer.getBoundingClientRect().top -
    imageContainer.offsetHeight / 2; // popup-container has top: 50%, hence the reset

  function moving(e) {
    // Get cursor & touch positions
    const posX = e.clientX || e.touches[0].clientX;
    const posY = e.clientY || e.touches[0].clientY;

    // Set image's absolute position to cursor position
    imageContainer.style.top = posY - shiftY + "px";

    // Important! Cannot store getBoundingClientRect() in a variable, won't work in this case
    // Set constraints for image dragging vertically
    if (imageContainer.getBoundingClientRect().top >= 0) {
      imageContainer.style.top =
        posY - shiftY - imageContainer.getBoundingClientRect().top + "px";
    } else if (
      imageContainer.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      imageContainer.style.top =
        posY -
        shiftY +
        (window.innerHeight - imageContainer.getBoundingClientRect().bottom) +
        "px";
    }
    // Add constaints for dragging horizontally in smaller viewport
    else if (window.innerWidth < 900) {
      imageContainer.style.left = posX - shiftX + "px";
      if (imageContainer.getBoundingClientRect().left >= 0) {
        imageContainer.style.left =
          posX - shiftX - imageContainer.getBoundingClientRect().left + "px";
      } else if (
        imageContainer.getBoundingClientRect().right <= window.innerWidth
      ) {
        imageContainer.style.left =
          posX -
          shiftX +
          (window.innerWidth - imageContainer.getBoundingClientRect().right) +
          "px";
      }
    }
  }

  imageContainer.addEventListener("mousemove", moving);
  imageContainer.addEventListener("touchmove", moving);

  // Remove the mousemove listener to stop image moving with cursor
  imageContainer.addEventListener("mouseup", () => {
    imageContainer.removeEventListener("mousemove", moving);
  });
  imageContainer.addEventListener("touchend", () => {
    imageContainer.removeEventListener("touchmove", moving);
  });

  // Disable HTML default dragging effect
  imageContainer.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });
}

function zoomImage(imageContainer) {
  imageContainer.firstChild.classList.toggle("zoom");
  // Re-center the image container in case of zoomed
  imageContainer.style.top = "50%";
  imageContainer.style.left = "50%";
}

function closePopUp(bgLayer) {
  bgLayer.remove();
}

function changeImage(change, imageContainer) {
  // Re-create pop-up image
  const newImage = document.createElement("img");

  // Remove current pop-up image
  imageContainer.firstChild.remove();
  // Add new pop-up image to its new container
  imageContainer.appendChild(newImage);
  // Re-center the image container in case of zoomed
  imageContainer.style.top = "50%";
  imageContainer.style.left = "50%";

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
