fetch("https://ovk-serverside.onrender.com/tablesName", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    if (data.message === "Success") {
      const tablesList = document.getElementsByClassName("tables")[0];

      data.names.map((name) => {
        const element = document.createElement("li");
        element.innerText = name;
        element.setAttribute("onclick", "clickTableName(this.innerText)")

        tablesList.appendChild(element);
      });
    }
  });

function clickTableName(e) {
    localStorage.setItem("tableName", e);
    window.location.href = "../../table.html";
}
