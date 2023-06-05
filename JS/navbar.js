const emailUser = localStorage.getItem("userMail");

if (emailUser !== "admin@gmail.com") {
  const adminButton = document.getElementById("adminButton");
  adminButton.style = "display:none";
}
fetch("https://ovk-serverside.onrender.com/checkUser", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: emailUser,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.message === "Success") {
      const { login, photo } = data;

      document.getElementById("profilePhoto").src =
        "data:image/png;base64," + photo;
      document.getElementsByClassName("name")[0].innerText = login;
    } else {
      window.location.href = "../../login.html";
    }
  })
  .catch((error) => {
    console.log(error);
  });
