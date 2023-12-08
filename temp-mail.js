

let emailInput = document.querySelector("#temp_email");
function setEmail(re) {
  emailInput.value = re[0];
  sessionStorage.setItem("user", emailInput.value);
}

async function runEmail() {
  await fetch("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
    .then(res => res.json())
    .then(data => {
      setEmail(data);
      console.log(data[0]);
    })
}

runEmail();

function getEmail() {
  let user = sessionStorage.getItem("user");
  let arr = user.split("@");
  let userName = arr[0];
  let domainName = arr[1];

  let viewEmail = `https://www.1secmail.com/api/v1/?action=getMessages&login=${userName}&domain=${domainName}`;

  fetch(viewEmail)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      if (data.length > 0) {
        document.querySelector(".sender").innerHTML = "";
        data.forEach((ele, i) => {
          document.querySelector(".sender").innerHTML += `
          <div class="sender_card" mail-id="${ele['id']}">
            <p>${ele['from']}</p>
            <p>${ele['subject']}</p>
          </div>`;
        })

        let senderItem = document.querySelectorAll(".sender_card");

        senderItem.forEach(elem => {
          elem.addEventListener("click", function () {
            let mailId = elem.getAttribute("mail-id");

            let usr = sessionStorage.getItem("user");
            let arr = usr.split("@");
            let messageUrl = `https://www.1secmail.com/api/v1/?action=readMessage&login=${arr[0]}&domain=${arr[1]}&id=${mailId}`;

            fetch(messageUrl).then(res => res.json())
            .then(data => {
              console.log(data);

              document.querySelector(".mail_message").innerHTML = `<div class="mail_body">
              <p>From:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${data['from']}</p>
              <p>Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${data['date']}</p>
              <p>Subject:&nbsp;&nbsp;${data['subject']}</p>
              <p style='font-size: 1.2rem;'>Body:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${data['body']}</p>
            </div>`;


            })
          })
        })


      }
    })

}

setInterval(() => {
  getEmail();
}, 15000);

let t = 15;

let getMail = setInterval(() => {
  t--;
  if (t == 0) {
    t = 15;
  }

  document.getElementById("refreshTimer").innerHTML = t;

}, 1000);


let selfRefreshBtn = document.querySelector("#refresh");

let changeTempMail = document.querySelector("#changeTempMail");
let copyMailBtn = document.querySelector("#copyMailBtn");

function copyToClipboard() {
  let rc = document.querySelector("#temp_email");

  rc.select();
  rc.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(rc.value);
}

selfRefreshBtn.addEventListener("click", getEmail);

copyMailBtn.addEventListener("click", copyToClipboard);
changeTempMail.addEventListener("click", runEmail);