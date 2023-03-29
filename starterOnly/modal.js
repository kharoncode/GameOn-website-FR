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

// Link formData to a Name
  // --Get all input link to formData
  var formDataInput = document.querySelectorAll(".formData input");
  var inputName = [];
  function input (){
    formDataInput.forEach(e => {
      inputName.push(e.name);
    });
    inputName = [...new Set(inputName)]; // del double
    inputName.pop(); // del the last one = newsletter
  }
  input();

  // --Add an Object "formDataObject" : key=name value=formData
  var formDataObject = new Object();
  function formDataName(inputName, formData){
    for (let i = 0; i<inputName.length; i++){
      formDataObject[`${inputName[i]}`]=formData[i];
    };
  }
  formDataName(inputName, formData);

// Error Messages
const errorMessagesObject = {
  first : "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  last : "bob Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  email : "Veuillez entrer une adresse mail valide.",
  birthdate : "Veuillez entrer une date de naissance valide.",
  quantity : "Vous devez indiquez un nombre entre 1 et 99",
  local : "Vous devez choisir une option.",
  cou : "Vous devez vérifier que vous acceptez les termes et conditions."
}

const errorMessagesArray = [
  "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  "Veuillez entrer une adresse mail valide.",
  "Veuillez entrer une date de naissance valide.",
  "Vous devez indiquez un nombre entre 1 et 99",
  "Vous devez choisir une option.",
  "Vous devez vérifier que vous acceptez les termes et conditions."
]

/* var test;
function addErrorMessage (name){
  formDataObject[`${name}`].dataset.error = errorMessages[`${name}`];
}

function startAdd (){
  for (let i = 0; i < errorMessages.length; i++) {
   addErrorMessage(Object.keys(errorMessages)[i]);
  }
} */

function startAdd (){
  for (let i = 0; i < errorMessagesArray.length; i++) {
   formData[i].dataset.error = errorMessagesArray[i];
  }
};
startAdd();

// Validity for each formData
var firstNameValidity = modalFirstName.validity.valid;
modalFirstName.addEventListener("keyup", (e)=>{
  firstNameValidity = e.target.validity.valid;
  /* formDataObject.first.dataset.error = errorMessages.first; */
  if(firstNameValidity !== true){
    formDataObject.first.dataset.errorVisible = true;
  }else{
    delete formDataObject.first.dataset.errorVisible;
  }
});

var lastNameValidity = modalLastName.validity.valid;
modalLastName.addEventListener("keyup", (e)=>{
  lastNameValidity = e.target.validity.valid;
  if(lastNameValidity !== true){
    formDataObject.last.dataset.errorVisible = true;
  }else{
    delete formDataObject.last.dataset.errorVisible;
  }
});

var mailValidity = modalMail.validity.valid;
modalMail.addEventListener("keyup", (e)=>{
  mailValidity = e.target.validity.valid;
  if(mailValidity !== true){
    formDataObject.email.dataset.errorVisible = true;
  }else{
    delete formDataObject.email.dataset.errorVisible;
  }
});

var birthdateValidity = modalBirthdate.validity.valid;
modalBirthdate.addEventListener("change", (e)=>{
  birthdateValidity = e.target.validity.valid;
  if(birthdateValidity !== true){
    formDataObject.birthdate.dataset.errorVisible = true;
  }else{
    delete formDataObject.birthdate.dataset.errorVisible;
  }
});

var quantityValidity = modalQuantity.validity.valid;
modalQuantity.addEventListener("keyup", (e)=>{
  quantityValidity = e.target.validity.valid;
  if(quantityValidity !== true){
    formDataObject.quantity.dataset.errorVisible = true;
  }else{
    delete formDataObject.quantity.dataset.errorVisible;
  }
});

var locationTournamentValidity;
function modalLocationTournamentValidity (){
  modalLocationTournament.forEach(button => {
    if (button.validity.valid === true){
      locationTournamentValidity = true;
    }
  })
}
document.querySelector('.content').addEventListener("change", (e)=>{
  modalLocationTournamentValidity();
  if(locationTournamentValidity !== true){
    formDataObject.location.dataset.errorVisible = true;
  }else{
    delete formDataObject.location.dataset.errorVisible;
  }
});

var couValidity = modalCOU.validity.valid;
modalCOU.addEventListener("change", (e)=>{
  couValidity = e.target.validity.valid;
  if(couValidity !== true){
    formDataObject.cou.dataset.errorVisible = true;
  }else{
    delete formDataObject.cou.dataset.errorVisible;
  }
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
