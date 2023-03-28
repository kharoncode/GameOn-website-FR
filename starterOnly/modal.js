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
const modalSubmit = document.querySelector(".btn-submit");
const modalClose = document.querySelectorAll(".close");
// -- Form
const modalFirstName = document.querySelector('input[id="first"]');
const modalLastName = document.querySelector('input[id="last"]');
const modalMail = document.querySelector('input[id="email"]');
const modalBirthdate = document.querySelector('input[id="birthdate"]');
const modalNbrTournament = document.querySelector('input[id="quantity"]');
const modalLocationTournament = document.querySelectorAll('input[name="location"]');
const modalCOU = document.querySelector('input[id="checkbox1"]');
const modalNewsletter = document.querySelector('input[id="checkbox2"]');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  modalSubmit.disabled = true;
  modalSubmit.style.background = "#7c4349";
}

// close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
var modalContent = document.querySelector(".content");
var modalContentDuration = getComputedStyle(modalContent).getPropertyValue("animation-duration").match(/\d+.\d+|\d+/)*1000;
function closeModal() {
  modalContent.style.animation = "modalclose var(--modal-duration) both";
  setTimeout(() => { 
    modalbg.style.display ="none";
    modalContent.style.animation = "modalopen var(--modal-duration)";
  }, modalContentDuration);
}


// Submit modal
// -- Checkbox-Radio
modalbg.addEventListener("change", ()=>{
  modalLocationTournament.forEach(e => {
    if(e.checked === true) {
      modalSubmit.disabled = false;
      modalSubmit.style.background = "#fe142f";
    }
  });
});

/* modalSubmit.addEventListener("click", ()=>{
  console.log("click");
}); */

// Test
/* var firstName = "";
modalFirstName.addEventListener("input", (e)=>{
  firstName = e.target.value;
  if (firstName.length < 2){
    console.log("Error");
  }
  else {
    console.log("ok");
  }
});

let validity;
modalbg.addEventListener("submit", ()=>{
  validity= modalFirstName.checkValidity();
  console.log(validity);
}); */