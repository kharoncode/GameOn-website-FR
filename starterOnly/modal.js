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

// OPEN/CLOSE MODAL
  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

  // launch modal form
  function launchModal() {
    modalbg.style.display = "block";
    if(modalForm.reportValidity() === true) {
      modalSubmit.style.background = "#fe142f";
    }else{
      modalSubmit.style.background = "#7c4349";
    }
  }

  // close modal event
    modalClose.forEach((btn) => btn.addEventListener("click", closeModal));
    document.querySelector(".confirmation-btn").addEventListener("click", closeModal);

  // close modal form
    var modalContent = document.querySelector(".content");
    // --Get var(--modal-duration)
      var modalContentDuration = getComputedStyle(modalContent).getPropertyValue("animation-duration").match(/[a-zA-Z]/);
      if(modalContentDuration == "s") {
        modalContentDuration = getComputedStyle(modalContent).getPropertyValue("animation-duration").match(/\d+.\d+|\d+/)*1000;
      } else if (modalContentDuraton == "ms"){
        modalContentDuration = getComputedStyle(modalContent).getPropertyValue("animation-duration").match(/\d+.\d+|\d+/);
      }
    // --Function closeModal
      function closeModal() {
        modalContent.style.animation = "modalclose var(--modal-duration) both";
        setTimeout(() => { 
          modalbg.style.display ="none";
          modalContent.style.animation = "modalopen var(--modal-duration)";
        }, modalContentDuration);
      }


// Link formData to a Name in an Object
  // --Get all input name
    var formDataInput = document.querySelectorAll(".formData input");
    var inputName = [];
    for(const key of formDataInput){
      inputName.push(key.name)
    }
    inputName = [...new Set(inputName)]; // del duplicate
    /* function inputNameAdd (){
      formDataInput.forEach(e => {
        inputName.push(e.name);
      });
      inputName = [...new Set(inputName)]; // del duplicate
    }
    inputNameAdd(); */
  // --Add an Object "formDataObject" : key=inputName value=formData
    var formDataObject = new Object();
    for (let i = 0; i<inputName.length; i++){
        formDataObject[`${inputName[i]}`]=formData[i];
      };


// Error Messages
  const errorMessagesObject = {
    first : "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
    last : "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    email : "Veuillez entrer une adresse mail valide 'Ex: jean@doe.com'.",
    birthdate : "Veuillez entrer une date de naissance valide.",
    quantity : "Vous devez indiquer un nombre entre 1 et 99",
    location : "Vous devez choisir une des options.",
    cos : "Vous devez vérifier que vous acceptez les termes et conditions.",
  }
  for (const key in errorMessagesObject) {
      const element = errorMessagesObject[key];
      formDataObject[key].dataset.error = element;
  }


// Custom Validity 
  // --Mail
    modalMail.setAttribute('pattern', "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}");
  // --Birthdate
    const date = new Date();
    let day = date.getDate();
    if(day<10){day=`0${day}`;}
    let month = date.getMonth()+1;
    if(month<10){month=`0${month}`;}
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    modalBirthdate.setAttribute('max', currentDate);
    modalBirthdate.setAttribute('min', "1907-03-04"); // Birthdade of the oldest woman on earth


// Show ErrorMessage for each formData
  function formDataValidity (key, modal){
    if(modal.target.validity.valid){
      delete formDataObject[key].dataset.errorVisible;
    }else{
      formDataObject[key].dataset.errorVisible = true;
    }
  }
  // --First Name
  modalFirstName.addEventListener("keyup", (e)=>{
    formDataValidity("first", e);
  }); 
  // --Last Name
  modalLastName.addEventListener("keyup", (e)=>{
    formDataValidity("last", e);
  });
  // --Email
  modalMail.addEventListener("keyup", (e)=>{
    formDataValidity("email", e);
  });
  // --Birthdate
  modalBirthdate.addEventListener("change", (e)=>{
    formDataValidity("birthdate", e);
  });
  // --Quantity
  modalQuantity.addEventListener("keyup", (e)=>{
    formDataValidity("quantity", e);
  });
  // --Location
  const modalInputLocation = document.getElementById('location1');
  modalSubmit.addEventListener("mouseover", ()=>{
    if(modalInputLocation.validity.valid){
      delete formDataObject['location'].dataset.errorVisible;
    }else{
      formDataObject['location'].dataset.errorVisible = true;
    };
  });

  // --Conditions of Sale
  var cosValidity = modalCOS.validity.valid;
  modalCOS.addEventListener("change", (e)=>{
    formDataValidity("cos", e);
  });

// Submit modal
  // -- Validity Test
    modalSubmit.addEventListener("mouseover", ()=>{
      if(modalForm.reportValidity()) {
        modalSubmit.style.background = "#fe142f";
      }else{
        modalSubmit.style.background = "#7c4349";
      }
    });
  // -- Onsubmit
    function validate(event){
      event.preventDefault()
      modalForm.style.animation = "formhidden var(--modal-duration) both";
      setTimeout(() => { 
        modalForm.classList.add('select-hide');
        document.querySelector(".confirmation-container").style.display = "flex";
        document.querySelector(".confirmation-container").style.animation = "confirmationanim var(--modal-duration) both";
        }, modalContentDuration);
    }