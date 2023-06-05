const buttonChange = document.getElementsByClassName("change")[0];
const buttonModify = document.getElementsByClassName("modify")[0];
const buttonDelete = document.getElementsByClassName("delete")[0];

let columnsName = [];
const firstColum = [];

fetch("https://ovk-serverside.onrender.com/tableColumNames", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    tablesName: localStorage.getItem("tableName"),
  }),
})
  .then((response) => response.json())
  .then((data) => {

    if (data.message === "Success") {

      const fields = document.getElementsByClassName("fields")[0];

      data.names.map((name) => {
        if (name != 'id_User') {

          const list = document.createElement("li");
          const inputField = document.createElement("input");
  
          // if (name.contains("password")) {
          //   inputField.setAttribute("type", "password");
          // }

          if (name === "Photo") {
            inputField.style = "display:none;";
            inputField.type = "file";
            inputField.accept = "image/*";
            inputField.id = "Photo";

            const divFile = document.createElement("div");
            divFile.style = "cursor:pointer;";
            divFile.classList.add("btn_image");
            divFile.setAttribute(
              "onclick",
              "document.getElementById('Photo').click()"
            );

            const icon = document.createElement("i");
            icon.className = "bx bx-cloud-upload icon";

            const span = document.createElement("span");
            span.innerText = "Выберите картинку";

            divFile.appendChild(icon);
            divFile.appendChild(span);
            divFile.appendChild(inputField);

            list.appendChild(divFile);
            fields.insertBefore(list, fields.firstChild);
          } else {
            list.innerText = name;

            inputField.id = name;

            list.appendChild(inputField);
            fields.insertBefore(list, fields.firstChild);
          }
        }
      });
    }
  });

fetch("https://ovk-serverside.onrender.com/tableGetData", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    tablesName: localStorage.getItem("tableName"),
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    if (data.message === "Success") {
      console.log(data.tableData);

      const listData = document.getElementsByClassName("listData")[0];

      const tableData = data.tableData;
      const keys = data.keys;

      firstColum.push(keys[0]);
      columnsName = data.keys;
      columnsName.shift();

      let primaryList = document.createElement("li");
      let containerList = document.createElement("ul");
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'id_User') {
          continue;
        }
        const list = document.createElement("li");
        list.innerText = keys[i];

        containerList.appendChild(list);
      }

      primaryList.appendChild(containerList);
      listData.appendChild(primaryList);

      for (let i = 0; i < tableData.length; i++) {

        primaryList = document.createElement("li");
        containerList = document.createElement("ul");

        const img = tableData[i]?.Photo;

        const r = Object.values(tableData[i]).filter(value => value !== undefined && value !== null && value !== "");

        if (tableData[i].id_User != localStorage.getItem('userId')) {
          continue;
        }

        const joinedString = r.join(" ");

        for (let j = 0; j < r.length - 1; j++) {
          const list = document.createElement("li");
          if (r[j] === img) {
            const imgObject = document.createElement("img");
            imgObject.src = "data:image/png;base64," + img;
            imgObject.style = "width:150px; height:100px";
            list.appendChild(imgObject);
          } else {
            list.innerText = r[j];
          }
          containerList.append(list);
        }

        const lastListItem = document.createElement("li");
        lastListItem.innerText = r[r.length - 1];
        containerList.append(lastListItem);
        //-----

        primaryList.setAttribute("onclick", `selectedData('${r}')`);

        primaryList.appendChild(containerList);
        listData.appendChild(primaryList);
      }
    }
  });

function selectedData(data) {
  //data = data.slice(0, -1).split(",");
  data = data.split(",");

  for (let i = 0; i < columnsName.length; i++) {
    if (columnsName[i] == 'id_User') {
      continue;
    }

    const element = document.getElementById(columnsName[i]);
    if (element.id === "Photo") {
      continue;
    }

    element.value = data[i + 1];
  }
  firstColum.push(data[0]);
}


buttonDelete.addEventListener("click", () => {
  fetch("https://ovk-serverside.onrender.com/tableDeleteData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tablesName: localStorage.getItem("tableName"),
      id: firstColum,
    }),
  });
});

buttonModify.addEventListener("click", () => {
  const data = [];
  let photo = -1;
  for (let i = 0; i < columnsName.length; i++) {
    if (columnsName[i] == 'id_User') {
      data.push(localStorage.getItem('userId'));
      continue;
    }
    const element = document.getElementById(columnsName[i]);
    if (element.id === "Photo") {
      photo = i;
      data.push(element.files[0]);
    } else {
      data.push(element.value);
    }
  }

  if (photo > -1) {
    let base64 = "";
    function getBase64(file, onLoadCallback) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = onLoadCallback;
    }

    getBase64(data[photo], (e) => {
      base64 = e.target.result;
      data[photo] = base64.substring(22);

      fetch("https://ovk-serverside.onrender.com/tableChangeData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tablesName: localStorage.getItem("tableName"),
          columnsName: columnsName,
          data: data,
          id: firstColum,
        }),
      });
    });
  } else {
    fetch("https://ovk-serverside.onrender.com/tableChangeData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tablesName: localStorage.getItem("tableName"),
        columnsName: columnsName,
        data: data,
        id: firstColum,
      }),
    });
  }
});

buttonChange.addEventListener("click", () => {
  const data = [];

  for (let i = 0; i < columnsName.length; i++) {
    if (columnsName[i] == 'id_User') {
      continue;
    }

    const element = document.getElementById(columnsName[i]);
    data.push(element.value);
  }

  data.splice(2, 0, localStorage.getItem('userId'));

  console.log(data);
  fetch("https://ovk-serverside.onrender.com/tableAddData", { //tableAddData
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tablesName: localStorage.getItem("tableName"),
      columnsName: columnsName,
      data: data,
    }),
  });
});
