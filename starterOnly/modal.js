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
    const modalForm = document.getElementById("myForm");
  // -- Form
    const modalFirstName = document.querySelector('input[id="first"]');
    const modalLastName = document.querySelector('input[id="last"]');
    const modalMail = document.querySelector('input[id="email"]');
    const modalBirthdate = document.querySelector('input[id="birthdate"]');
    const modalQuantity = document.querySelector('input[id="quantity"]');
    const modalLocation = document.querySelectorAll('input[name="location"]');
    const modalCOS = document.querySelector('input[id="checkbox1"]');
    const modalNewsletter = document.querySelector('input[id="checkbox2"]');

// btn-submit background change if modalForm.reportValidity=true/false
function submitColorValidity(){
  if(modalForm.reportValidity()) {
    modalSubmit.style.background = "#fe142f";
    modalSubmit.style.cursor= "pointer"
  }else{
    modalSubmit.style.background = "#7c4349";
    modalSubmit.style.cursor= "not-allowed";
  }
} 

// OPEN/CLOSE MODAL
  // --launch modal event
    modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

    // --launch modal form
    function launchModal() {
      modalbg.style.display = "block";
      submitColorValidity();
    }

  // --close modal event
    modalClose.forEach((btn) => btn.addEventListener("click", closeModal));
    document.querySelector(".confirmation-btn").addEventListener("click", closeModal);

  // --close modal form
    var modalContent = document.querySelector(".content");
    // --Get var(--modal-duration) and convert it for JS
      var modalContentDuration = getComputedStyle(modalContent).getPropertyValue("animation-duration").match(/[a-zA-Z]/);
      if(modalContentDuration == "s") {
        modalContentDuration = getComputedStyle(modalContent).getPropertyValue("animation-duration").match(/\d+.\d+|\d+/)*1000;
      } else if (modalContentDuration == "ms"){
        modalContentDuration = getComputedStyle(modalContent).getPropertyValue("animation-duration").match(/\d+.\d+|\d+/);
      }
    // --Function closeModal
      function closeModal() {
        modalContent.style.animation = "modalclose var(--modal-duration) both";
        setTimeout(() => { 
          modalbg.style.display ="none";
          modalContent.style.animation = "modalopen var(--modal-duration)"; // reset animation
        }, modalContentDuration);
      };

// Link each formData to a Name in an Object
  // --Get all input name
    var formDataInput = document.querySelectorAll(".formData input");
    var inputName = [];
    for(const key of formDataInput){
      inputName.push(key.name)
    };
    inputName = [...new Set(inputName)]; // del duplicate
  // --Add an Object "formDataObject" : key=inputName value=formData
    var formDataObject = new Object();
    for (let i = 0; i<inputName.length; i++){
        formDataObject[`${inputName[i]}`]=formData[i];
      };

// Error Messages
  const errorMessagesObject = {
    first : "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
    last : "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    email : "Veuillez entrer une adresse mail valide. Ex: game@on.com",
    birthdate : "Veuillez entrer une date de naissance valide.",
    quantity : "Indiquez un nombre entre 0 et 99",
    location : "Choisissez une des options.",
    cos : "Vérifiez que vous acceptez les conditions d'utilisation.",
  }
  // --add to each FormData his ErrorMessage
  for (const key in errorMessagesObject) {
      const element = errorMessagesObject[key];
      formDataObject[key].dataset.error = element;
  }

// Custom Validity 
  // --FirstName
    /* modalFirstName.setAttribute('pattern', "^[^\\d].*[\\w]$"); */
  // --LasttName
    /* modalLastName.setAttribute('pattern', "^[^\\d].*[\\w]$"); */
  // --Mail
    modalMail.setAttribute('pattern', "[a-z0-9._+-]+@[a-z0-9.-]+\\.[a-z]{2,}");
  // --Birthdate
    const date = new Date(); // Get current date
    let day = date.getDate(); // Get Day
    if(day<10){day=`0${day}`;}
    let month = date.getMonth()+1; // Get Month
    if(month<10){month=`0${month}`;}
    let year = date.getFullYear(); // Get Year
    let currentDate = `${year}-${month}-${day}`; // Concatenation
    modalBirthdate.setAttribute('max', currentDate);
    modalBirthdate.setAttribute('min', "1907-03-04"); // Birthdade of the oldest woman on earth

// Show ErrorMessage for each formData
  // --for each formData add/remove errorMessage if formData.validity = false/true
    function formDataValidity (key, modal){
      if(modal.validity.valid){
        delete formDataObject[key].dataset.errorVisible;
      }else{
        formDataObject[key].dataset.errorVisible = true;
      }
    }
  // --First Name
    var firstNameValue = modalFirstName.value.trim();
    modalFirstName.addEventListener("keyup", (e)=>{
      formDataValidity("first", e.target);
      firstNameValue = e.target.value.trim();
    });
  // --Last Name
    var lastNameValue = modalLastName.value.trim();
    modalLastName.addEventListener("keyup", (e)=>{
      formDataValidity("last", e.target);
      lastNameValue = e.target.value.trim();
    });
  // --Email
    modalMail.addEventListener("keyup", (e)=>{
      formDataValidity("email", e.target);
    });
  // --Birthdate
    modalBirthdate.addEventListener("change", (e)=>{
      formDataValidity("birthdate", e.target);
    });
  // --Quantity
    modalQuantity.addEventListener("keyup", (e)=>{
      formDataValidity("quantity", e.target);
    });
  // --Location
    const modalInputLocation = modalLocation[0]; // if one input[type:radio].validity=true, the other=true too
    document.getElementById("location").addEventListener("mouseover", (e)=>{
      formDataValidity("location", modalInputLocation);
    });
    document.getElementById("location").addEventListener("click", (e)=>{
      formDataValidity("location", modalInputLocation);
    });
  // --Conditions of Sale (cos)
    var cosValidity = modalCOS.validity.valid;
    modalCOS.addEventListener("change", (e)=>{
      formDataValidity("cos", e.target);
    });

// Submit modal
  // -- First Validity Test:
    modalSubmit.addEventListener("mouseover", ()=>{
      submitColorValidity();
    });
  // -- Onsubmit
  function validate(event){
        modalFirstName.value = firstNameValue;
        modalLastName.value = lastNameValue;
        if(firstNameValue.length <2 || lastNameValue.length <2){
          if(firstNameValue.length <2 && lastNameValue.length <2){
          formDataObject["first"].dataset.errorVisible = true;
          formDataObject["last"].dataset.errorVisible = true;
          } else if(firstNameValue.length <2){
            formDataObject["first"].dataset.errorVisible = true;
          } else if(lastNameValue.length <2){
            formDataObject["last"].dataset.errorVisible = true;
          }
          modalSubmit.style.background = "#7c4349";
          modalSubmit.style.cursor= "not-allowed";
          return false;
        }
        else{
        event.preventDefault(); // stop default event of onsubmit
        modalForm.style.animation = "formhidden var(--modal-duration) both";
        setTimeout(() => {
          modalForm.classList.add('select-hide'); // display=none;
          document.querySelector(".confirmation-container").style.display = "flex";
          document.querySelector(".confirmation-container").style.animation = "confirmationanim var(--modal-duration) both";
          }, modalContentDuration);
        
      }
    }