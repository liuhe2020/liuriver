"use strict";

const form = document.querySelector(".contact-form");
const fullName = document.querySelector("#fullname");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");

form.addEventListener("keyup", (e) => {
  // Show or hide green tick based on user input value
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

  // Check fields and only when all criteria are met, submit
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
