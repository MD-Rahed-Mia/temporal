let expand = document.querySelectorAll(".expand_menu");

expand.forEach((element) => {
  element.addEventListener("click", function () {
    let innerText = element.querySelector("p");
    let innerImg = element.querySelector("img");
    innerImg.classList.toggle("active");
    innerText.classList.toggle("active");
  });
});

let register = document.querySelector("#register");
let signUpBtn = document.querySelector(".sign_up");
let overlay = document.querySelector(".sign_up_overlay");
let signInBtn = document.querySelector("#sign_in");
let sign_in_overlay = document.querySelector(".sign_up_overlay");
let signInBox = document.querySelector(".sign_in");
let signInIf = document.querySelector("#signInIfhave");
let noAccSingUp = document.querySelector("#noAccSingUp");

let temp_email = document.querySelector("#temp_email");

let copyTempMail = document.querySelector("#copyMailBtn");
let changeTempMail = document.querySelector("#changeTempMail");
let refreshTimer = document.querySelector("#refreshTimer");
let sender = document.querySelector(".sender");
let mailMessage = document.querySelector(".mail_message");

let mail1 = document.querySelectorAll(".mail1");

let refreshBtn = document.querySelector("#refresh");




let count = 0;
let arr = [];
let randomNum = 0;


function random(max) {
  randomNum = Math.ceil(Math.random() * max);
  return randomNum;
}


function signUp() {
  signUpBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = "hidden";
}
function hideSignUp() {
  overlay.classList.remove("active");
  signUpBtn.classList.remove("active");
  document.body.style.overflow = "scroll";
  signInBox.classList.remove("active");
}

function displaySignin() {
  signInBox.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = "hidden";
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

function copyTempMailClick() {
  navigator.clipboard
    .writeText(temp_email.value)
    .then(() => {
      console.log("successfull");
    })
    .catch((e) => {
      console.log("failed");
    });
}

function changeTempMailFunc() {
  random(8);

  fetchData();
}

let t = 10;
function setRefreshTime() {
  setInterval(() => {
    t--;
    refreshTimer.innerHTML = t;
    if (t == 0) {
      t = 10;
      let ld = JSON.parse(localStorage.getItem("df"));

      setInbox(ld, temp_email.value);

    }
  }, 1000);
}

setRefreshTime();


function setInbox(data, temp_email) {

  console.log("working");


  let allKeys = data[temp_email.value];


  if (Object.keys(allKeys).length == 0) {
    sender.innerHTML = `
      <div class="thumb_card">
        <div class="thumb_circle"></div>
        <div class="thumb_rect"></div>
      </div>
      <div class="thumb_card">
        <div class="thumb_circle"></div>
        <div class="thumb_rect"></div>
      </div>
      <div class="thumb_card">
        <div class="thumb_circle"></div>
        <div class="thumb_rect"></div>
      </div>
    `
  }

  for (const key in allKeys) {


    arr.push(key);

  }

  arr.forEach(ele => {

    sender.innerHTML = '';

    arr.forEach(ele => {
      sender.innerHTML += `
      <div class="mail_card">
      <img src="images/149071.png" alt="img">
      <div>
        <p id='senderId'>${ele}</p>
      </div>
      </div>
      `;
    })
  })

  arr = [];
  // for (const key in data[temp_email.value]) {

  //   arr.push(key);

  // }



  let mail1 = document.querySelectorAll(".mail1");

  mail1.forEach(elem => {
    elem.addEventListener("click", function () {
      let senderId = elem.querySelector("#senderId").textContent;
      mailMessage.textContent = data[temp_email.value][senderId];
    });
  })



}


mail1.forEach(ele1 => {
  ele1.addEventListener("click", viewEmail);
})

function refreshNow() {
  let df = JSON.parse(localStorage.getItem("df"));
  setInbox(df, temp_email.value);
}

overlay.addEventListener("click", hideSignUp);
register.addEventListener("click", signUp);
signInBtn.addEventListener("click", displaySignin);
signInIf.addEventListener("click", gotoSign);
noAccSingUp.addEventListener("click", gotoSignUp);
copyTempMail.addEventListener("click", copyTempMailClick);
changeTempMail.addEventListener("click", changeTempMailFunc);

refreshBtn.addEventListener("click", refreshNow);



function fetchData() {
  fetch("temp_mail.json")
    .then((res) =>
      res.json().then((data) => {
        let objectKeys = Object.keys(data);

        let m = objectKeys.length - 1;

        let n = random(m);

        console.log(n);

        let mail = [];

        for (const key in data) {
          mail.push(key);
        }

        console.log(data);
        temp_email.value = mail[n];

        setInbox(data, temp_email);
        localStorage.setItem("df", JSON.stringify(data));


        // if (count == objectKeys.length - 1) {
        //   count = 0;
        // }

        // if (innerObjectKeys !== 0 && innerObjectKeys != null) {
        //   setInbox(data, temp_email);
        // } else {
        //   mailMessage.innerHTML = `
        //     <h1>No email found</h1>
        //   `;
        // }
      })
    )

    .catch((e) => console.log(e));
}

document.addEventListener("DOMContentLoaded", function () {
  fetchData();
})
