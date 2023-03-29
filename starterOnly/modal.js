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
const modalQuantity = document.querySelector('input[id="quantity"]');
const modalLocationTournament = document.querySelectorAll('input[name="location"]');
const modalCOU = document.querySelector('input[id="checkbox1"]');
const modalNewsletter = document.querySelector('input[id="checkbox2"]');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  if(document.getElementById("myForm").reportValidity() === true) {
    modalSubmit.style.background = "#fe142f";
  }else{
    modalSubmit.style.background = "#7c4349";
  }
  modalLocationTournamentValidity ();
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

//TEST
function validity(valide){
  if (valide!==true){
    console.log("true")
  }
}

var test = document.querySelectorAll(".formData");
var testbis = test(input["name='firstName'"]);

// Error Messages
const errorMessages = {
  firstName : "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  lastName : "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  mail : "Veuillez entrer une adresse mail valide.",
  birthdate : "Veuillez entrer une date de naissance valide.",
  quantity : "Vous devez indiquez un nombre entre 1 et 99",
  local : "Vous devez choisir une option.",
  cou : "Vous devez vérifier que vous acceptez les termes et conditions."
}

// Validity for each formData
var firstNameValidity = modalFirstName.validity.valid;
modalFirstName.addEventListener("change", (e)=>{
  firstNameValidity = e.target.validity.valid;
});

var lastNameValidity = modalLastName.validity.valid;
modalLastName.addEventListener("change", (e)=>{
  lastNameValidity = e.target.validity.valid;
});

var mailValidity = modalMail.validity.valid;
modalMail.addEventListener("change", (e)=>{
  mailValidity = e.target.validity.valid;
});

var birthdateValidity = modalBirthdate.validity.valid;
modalBirthdate.addEventListener("change", (e)=>{
  birthdateValidity = e.target.validity.valid;
});

var quantityValidity = modalQuantity.validity.valid;
modalQuantity.addEventListener("change", (e)=>{
  quantityValidity = e.target.validity.valid;
});

var locationTournamentValidity;
function modalLocationTournamentValidity (){
  modalLocationTournament.forEach(button => {
    if (button.validity.valid === true){
      locationTournamentValidity = true;
    }
  })
}
document.querySelector('.locationTournament').addEventListener("change", (e)=>{
  modalLocationTournamentValidity();
});

var couValidity = modalCOU.validity.valid;
modalCOU.addEventListener("change", (e)=>{
  couValidity = e.target.validity.valid;
});

// Submit modal
modalbg.addEventListener("change", ()=>{
  if(document.getElementById("myForm").reportValidity() === true) {
    modalSubmit.style.background = "#fe142f";
  }else{
    modalSubmit.style.background = "#7c4349";
  }
});

// TODO
// Use onsubmit : evenement lors du submit
// Use setCustomValidity(errorMessage) : custom error message
