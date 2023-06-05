const Confirm = () => {
  const emailUser = document.getElementById("email");
  const confirmButton = document.getElementsByClassName("confirm-button")[0];

  if (
    !confirmButton.classList.contains("code") &&
    !confirmButton.classList.contains("reset")
  ) {
    fetch("https://ovk-serverside.onrender.com/resetCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailUser.value,
      }),
    }).then((response) => {
      if (response.statusText === "OK") {
        const codeBlock = document.getElementById("additional");

        codeBlock.id = "active";

        confirmButton.value = "Подтвердить";

        confirmButton.classList.add("code");

        emailUser.setAttribute("readonly", "readonly");
      }
    });
  } else if (confirmButton.classList.contains("code")) {
    const code = document.getElementById("code");
    fetch("https://ovk-serverside.onrender.com/confirmCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailUser.value,
        code: code.value,
      }),
    }).then((response) => {
      if (response.statusText === "OK") {
        const box2 = document.getElementsByClassName("box2")[0];

        let show = document.querySelector(".show");
        let show1 = document.querySelector(".show1");

        show.style = "opacity:1";
        show1.style = "opacity:1";

        box2.classList.add("active");

        emailUser.removeAttribute("readonly", "readonly");

        sessionStorage.setItem("emai", emailUser.value);

        emailUser.value = "";
        code.value = "";

        emailUser.parentElement.children[1].innerText = "Пароль";
        code.parentElement.children[1].innerText = "Подтвердите пароль";

        emailUser.type = "password";
        code.type = "password";

        confirmButton.classList.remove("code");
        confirmButton.classList.add("reset");

        CheckPassword("");
      }
    });
  } else {
    fetch("https://ovk-serverside.onrender.com/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: sessionStorage.getItem("emai"),
        password: emailUser.value,
      }),
    }).then((response) => {
      if (response.statusText === "OK") {
        window.location.href = "../../login.html";
      }
    });
  }
};


let pswrd = document.querySelector("#email");
let pswrd1 = document.querySelector("#code");
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