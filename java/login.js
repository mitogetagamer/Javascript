'use strict';
/* IMPORTS */
/* VARIABLES */
const d = document;

const $signUp = d.getElementById('signUp');

const credentials = {
  name: null,
  nameValid: null,
  email: null,
  emailValid: null,
  password: null,
  passwordValid: null,

};

let allowSubmit = false;

/* EVENTS */
d.addEventListener('DOMContentLoaded', () => {
  eventListeners();
});

/* FUNCTIONS */
function eventListeners() {
  $signUp.name.addEventListener('input', () => {
    checkInput('name');
  });
  $signUp.name.addEventListener('blur', () => {
    checkInput('name');
  });

  $signUp.email.addEventListener('input', () => {
    checkInput('email');
  });
  $signUp.email.addEventListener('blur', () => {
    checkInput('email');
  });

  $signUp.password.addEventListener('input', () => {
    checkInput('password');
  });
  $signUp.password.addEventListener('blur', () => {
    checkInput('password');
  });



  $signUp.addEventListener('submit', handleSubmit);
}

function checkInput(inputName) {
  if (inputName === 'name') {
    const $nameWarning = d.getElementById('nameWarning');
    credentials.name = $signUp.name.value.trim();
    credentials.nameValid = false;
    if (credentials.name == '') {
      $nameWarning.textContent = 'Porfavor ingrese su nombre';
    } else {
      $nameWarning.textContent = '';
      credentials.nameValid = true;
    }
  }
  if (inputName === 'email') {
    const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const $emailWarning = d.getElementById('emailWarning');
    credentials.email = $signUp.email.value.trim();
    credentials.emailValid = false;
    if (credentials.email == '') {
      $emailWarning.textContent = 'Porfavor ingrese su correo electronico';
    } else if (!regExp.test(credentials.email)) {
      $emailWarning.textContent = 'Porfavor ingrese una dirección valida';
    } else {
      $emailWarning.textContent = '';
      credentials.emailValid = true;
    }
  }
  if (inputName === 'password') {
    const $passwordWarning = d.getElementById('passwordWarning');
    credentials.password = $signUp.password.value.trim();
    credentials.passwordValid = false;
    if (credentials.password == '') {
      $passwordWarning.textContent = 'Porfavor ingrese su contraseña';
    } else if (
      credentials.passwordConfirm &&
      credentials.password != credentials.passwordConfirm
    ) {
      $passwordWarning.textContent = "Las contraseñas no coinciden";
    } else {
      $passwordWarning.textContent = '';
      credentials.passwordValid = true;
    }
  }

  
 
  setAllowSubmit();
}

function setAllowSubmit() {
  allowSubmit =
    credentials.nameValid &&
    credentials.emailValid &&
    credentials.passwordValid;
;
  if (allowSubmit) {
    $signUp.submitButton.removeAttribute('disabled');
  } else {
    $signUp.submitButton.setAttribute('disabled', true);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  if (allowSubmit) {
    console.log('submit: ', {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
     
    });
    console.log('send data to backend for processing');
    $signUp.reset();
    window.location.href =
      'http://127.0.0.1:5500/java/privado.html';
  
  } else {
    console.log('notify the user and do not allow sending data');
  }
}