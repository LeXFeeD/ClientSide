function sendCode() {
  const userName = document.getElementById("userName").value;
  const emailUser = document.getElementById("email").value;
  const password = document.getElementById("myPassword").value;
  //need send photo
  //console.log(emailuser.value)
  fetch("https://ovk-serverside.onrender.com/sendCode", {
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
      if (data.message === "exists") {
        alert("User with that email already exists");
      } else {
        const { code } = data;
        localStorage.setItem("code", code);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
