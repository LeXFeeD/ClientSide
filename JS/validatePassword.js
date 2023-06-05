// Основные действия (проверки, переход, уведомления)
function checkForm() {
    // Получаем все поля формы используя селектор querySelectorAll
    const formFields = document.querySelectorAll(
      'input[type="text"],input[type="password"]'
    );
    console.log(formFields);
    const codeyip = formFields[4];
  
    // Получаем поля ввода myPassword и myPassword1 по их идентификаторам
    let myPassword = document.getElementById("myPassword");
    let myPassword1 = document.getElementById("myPassword1");
  
    // Условие для проверки того, что пароли не совпадают, и в таком случае выводим предупреждающее сообщение.
    if (myPassword.value !== myPassword1.value) {
      alert("Пароли не совпадают!");
      return false;
    }
  
    // Проходимся по каждому полю и проверяем его значение
    for (let i = 0; i < formFields.length; i++) {
      if (!formFields[i].value) {
        // Если какое-то поле не заполнено, то выводим сообщение и прерываем выполнение функции.
        alert("Все поля должны быть заполнены!");
        return false;
      }
    }
  
    //Проверка на совпадение кода
    if (codeyip.value !== localStorage.getItem("code")) {
      alert("Код не совпадает");
      return false;
    }
  
    //Проверка условий пароля
    var myPassword3 = document.getElementById("myPassword").value;
    var upperCase = /[A-Z]/g;
    if (!myPassword3.match(upperCase)) {
      alert("Пароль должен содержать хотя бы один символ верхнего регистра");
      return false;
    }
    var lowerCase = /[a-z]/g;
    if (!myPassword3.match(lowerCase)) {
      alert("Пароль должен содержать хотя бы один символ нижнего регистра");
      return false;
    }
    var numbers = /[0-9]/g;
    if (!myPassword3.match(numbers)) {
      alert("Пароль должен содержать хотя бы одну цифру");
      return false;
    }
    var specialCharacters = /[@$!%*?&]/g;
    if (!myPassword3.match(specialCharacters)) {
      alert("Пароль должен содержать хотя бы один специальный символ");
      return false;
    }
    if (myPassword3.length < 8) {
      alert("Пароль должен быть не менее 8 символов");
      return false;
    }
    const emailUser = document.getElementById("email");
    localStorage.setItem("userMail", emailUser.value);
  
    // Если все поля прошли проверку на заполненность, делаем переход на другую страницу
    window.location.href = "../../home.html";
  }
  