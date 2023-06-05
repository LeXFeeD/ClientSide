let chart = null;

const moth = document.getElementById("moth");

const moths = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const ul = document.createElement("ul");

for (let i = 0; i < moths.length; i++) {
  const li = document.createElement("li");

  li.setAttribute("onclick", `mothClicked('${moths[i]}')`);
  li.innerText = moths[i];

  ul.appendChild(li);
}

moth.appendChild(ul);

const mothClicked = (value) => {
  const email = localStorage.getItem("userMail");

  const number = moths.indexOf(value);

  fetch("https://ovk-serverside.onrender.com/getExpense", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailUser,
      moth: number,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (chart) {
        chart.clear();
        chart.destroy();
      }

      const ctx = document.getElementById("myChart");

      const labels = [];
      const sum = [];

      for (let i = 0; i < data.length; i++) {
        if (labels.includes(data[i].Name)) {
          const index = labels.indexOf(data[i].Name);
          sum[index] += data[i].Sum;
        } else {
          labels.push(data[i].Name);
          sum.push(data[i].Sum);
        }
      }

      const dataDiagram = {
        labels: labels,
        datasets: [
          {
            label: "Расходы",
            data: sum,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(201, 203, 207)",
              "rgb(54, 162, 235)",
            ],
            hoverOffset: 4,
          },
        ],
      };

      const config = {
        type: "doughnut",
        data: dataDiagram,
      };

      chart = new Chart(ctx, config);
    });
};
