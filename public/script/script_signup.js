/*SIGN UP */

const myInput = document.getElementById("input_password");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const textLength = document.getElementById("length");
const speciel = document.getElementById("speciel");
const message = document.getElementById("message");

// When the user clicks on the password field, show this message box
myInput.onfocus = function() {
    document.getElementById("message").classList.add("show-message");

}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").classList.remove("show-message");
}


// When the user starts to type something inside the password field
myInput.onkeyup = function() {

  // Validate lowercase letters
  const lowerCaseLetters = /[a-zæøå]/;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  
  // Validate capital letters
  const upperCaseLetters = /[A-ZÆØÅ]/;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  const numbers = /[0-9]/;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  // Validate length
  if(myInput.value.length >= 8) {
    textLength.classList.remove("invalid");
    textLength.classList.add("valid");
  } else {
    textLength.classList.remove("valid");
    textLength.classList.add("invalid");
  }

  //validate special characters
  const specialCharacters = /[!@#$%^&*(),.?":{}|<>;_-]/;
  if(myInput.value.match(specialCharacters)) {
    speciel.classList.remove("invalid");
    speciel.classList.add("valid");
  } else {
    speciel.classList.remove("valid");
    speciel.classList.add("invalid");
  }
}

//check if password match 
function validate() {
    const inputPassword = document.getElementById("input_password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    if (inputPassword != confirmPassword) {
        alert("Password do not match");
        return false;
    }
    return true;
}
