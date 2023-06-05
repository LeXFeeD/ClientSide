const SignIn = () => {
  const userName = document.getElementById("userName").value;
  const emailUser = document.getElementById("email").value;
  const password = document.getElementById("myPassword").value;

  fetch("https://ovk-serverside.onrender.com/enterUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: userName,
      password: password,
      email: emailUser,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Wrong data") {
        alert("Check login or password or email");
      } else if (data.message === "Doesn't exist") {
        alert("Doesn't exist");
      } else {
        window.location.href = "../../home.html";
        localStorage.setItem("userMail", emailUser);
        localStorage.setItem("userId", data.user_id);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
