let expand = document.querySelectorAll(".expand_menu");

expand.forEach(element => {
  element.addEventListener("click", function () {
    let innerText = element.querySelector("p");
    let innerImg = element.querySelector("img");
    innerImg.classList.toggle("active");
    innerText.classList.toggle("active");
  })
})

let register = document.querySelector("#register");
let signUpBtn = document.querySelector(".sign_up");
let overlay = document.querySelector(".sign_up_overlay");
let signInBtn = document.querySelector("#sign_in");
let sign_in_overlay = document.querySelector(".sign_up_overlay");
let signInBox = document.querySelector(".sign_in");
let signInIf = document.querySelector("#signInIfhave");
let noAccSingUp = document.querySelector("#noAccSingUp");


function signUp() {
  signUpBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = 'hidden';
}
function hideSignUp() {
  overlay.classList.remove("active");
  signUpBtn.classList.remove("active");
  document.body.style.overflow = 'scroll';
  signInBox.classList.remove("active");
}


function displaySignin() {
  signInBox.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = 'hidden';
}

function gotoSign() {
  
  signUpBtn.classList.remove("active");
  overlay.classList.add("active");
  signInBox.classList.add("active");
}

function gotoSignUp() {
  
  signInBox.classList.remove("active");
  overlay.classList.add("active");
  signUpBtn.classList.add("active");
}
overlay.addEventListener("click", hideSignUp);
register.addEventListener("click", signUp);
signInBtn.addEventListener("click", displaySignin);
signInIf.addEventListener("click", gotoSign);
noAccSingUp.addEventListener("click", gotoSignUp);