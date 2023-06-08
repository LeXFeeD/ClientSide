const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggleButton = body.querySelector(".toggle");
const searchBtn = body.querySelector(".search-box");
const modeSwitch = body.querySelector(".toggle-switch");
const modeText = body.querySelector(".mode-text");

toggleButton.addEventListener('click', function () {
    sidebar.classList.toggle('close');
    localStorage.setItem('sidebarState', sidebar.classList.contains('close'));
});

/*searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
});*/

const isSidebarClosed = JSON.parse(localStorage.getItem('sidebarState'));

if (isSidebarClosed === true) {
    sidebar.classList.add('close');
} else {
    sidebar.classList.remove('close');
}

// Выбираем настройки темы из localStorage
const currentTheme = localStorage.getItem("theme");

// Если текущая тема в localStorage равна "dark"…
if (currentTheme == "dark") {
    // …тогда мы используем класс .dark-theme
    body.classList.add("dark");
}

// Отслеживаем щелчок по кнопке
modeSwitch.addEventListener("click", function () {
    // Переключаем класс .dark-theme при каждом щелчке  
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        modeText.innerText = "Светлая тема"
    } else {
        modeText.innerText = "Темная тема"
    }
    // Допустим, тема светлая
    let theme = "light";
    // Если <body> содержит класс .dark-theme…
    if (body.classList.contains("dark")) {
        // …тогда делаем тему тёмной
        theme = "dark";
    }
    // После чего сохраняем выбор в localStorage
    localStorage.setItem("theme", theme);
});
