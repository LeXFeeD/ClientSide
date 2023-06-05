let pswrd = document.querySelector("#myPassword");
let pswrd1 = document.querySelector("#myPassword1");
let eyeIcon = document.querySelector("#ViewImg");
let eyeIcon1 = document.querySelector("#ViewImg1");
let show = document.querySelector(".show");
let show1 = document.querySelector(".show1");
show.onclick = function () {
  if (pswrd.type === "password") {
    pswrd.setAttribute("type", "text");
    eyeIcon.setAttribute("src", "Images/view.svg");
  } else {
    pswrd.setAttribute("type", "password");
    eyeIcon.setAttribute("src", "Images/hide.svg");
  }
};
show1.onclick = function () {
  if (pswrd1.type === "password") {
    pswrd1.setAttribute("type", "text");
    eyeIcon1.setAttribute("src", "Images/view.svg");
  } else {
    pswrd1.setAttribute("type", "password");
    eyeIcon1.setAttribute("src", "Images/hide.svg");
  }
};
