// Responsive Nav
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
// -- Base
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalSubmit = document.querySelectorAll(".btn-submit");
const modalClose = document.querySelectorAll(".close");
// -- Form
const modalFirstName = document.querySelector('input[id="first"]');
const modalLastName = document.querySelector('input[id="last"]');
const modalMail = document.querySelector('input[id="email"]');
const modalBirthdate = document.querySelector('input[id="birthdate"]');
const modalNbrTournament = document.querySelector('input[id="quantity"]');
/* const modalLocationTournament = document.querySelector('input[id="first"]'); */
const modalCOU = document.querySelector('input[id="checkbox1"]');
const modalNewsletter = document.querySelector('input[id="checkbox2"]');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal() {
  modalbg.style.display ="none";
}

// Submit modal
