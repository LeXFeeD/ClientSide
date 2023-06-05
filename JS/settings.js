const changeButton = document.getElementById("change");
const loginField = document.getElementById("login");
const passwordField = document.getElementById("password");
const imageData = document.getElementById("image");
const img = document.getElementById("img");

changeButton.addEventListener("click", () => {
  if (loginField.value.trim().length > 0) {
    const login = loginField.value;
    fetch("https://ovk-serverside.onrender.com/changeLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userMail"),
        login: login,
      }),
    });
  }
  if (passwordField.value.trim().length > 0) {
    const pass = password.value;
    fetch("https://ovk-serverside.onrender.com/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userMail"),
        password: pass,
      }),
    });
  }
  if (imageData.value.length > 0) {
    let base64 = "";
    const getBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
      });

    // (file, onLoadCallback) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     return reader.result;
    //   };
    // }

    async function sendImage() {
      base64 = await getBase64(imageData.files[0]);
      fetch("https://ovk-serverside.onrender.com/changeImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64,
          email: localStorage.getItem("userMail"),
        }),
      });
    }
    sendImage();
    // getBase64(, (e) => {
    //   base64 = e.target.result;

    // });
  }
});
