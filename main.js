let expand = document.querySelectorAll(".expand_menu");

console.log(expand);

expand.forEach(element => {
  element.addEventListener("click", function () {
    let innerText = element.querySelector("p");
    let innerImg =element.querySelector("img");
    innerImg.classList.toggle("active");
    innerText.classList.toggle("active");
  })
})