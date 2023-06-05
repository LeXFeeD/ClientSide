//const dropList = document.querySelectorAll(".drop-list select"),
//fromCurrency = document.querySelector(".from select"),
//toCurrency = document.querySelector(".to select");
const dropList = document.querySelectorAll(".drop-list select");
const convertBtn = document.getElementById('convert-btn');
//const swapBtn = document.getElementById('swap-btn');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');
const currencyFromSelect = document.getElementById('currency-from');
const currencyToSelect = document.getElementById('currency-to');

/*for (let i = 0; i < dropList.length; i++) {
    for(currency_code in country_code){
        //console.log(currency_code)
        
        // выбор USD по умолчанию в качестве валюты "Из" и RUB в качестве валюты "В"
        let selected;
        if (i == 0) {
            selected = currency_code == "USD - Доллар США" ? "selected" : "";
        }else if(i == 1){
            selected = currency_code == "RUB - Российский рубль" ? "selected" : "";
        }
        
        // создание опционального тега с передачей кода валюты в виде текста и значения
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // вставка тега options внутрь тега select
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
} */

/*convertBtn.addEventListener("click", e =>{
    e.preventDefault(); // запрет отправки формы
    getExchangeRate();
})*/

// Запрос курса валют
async function getExchangeRate(fromCurrency, toCurrency) {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    return data.rates[toCurrency];
}

// Конвертирование валюты
async function convertCurrency() {
    const amount = amountInput.value;
    const fromCurrency = currencyFromSelect.value;
    const toCurrency = currencyToSelect.value;

    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);

    const convertedAmount = (amount * exchangeRate).toFixed(2);
    resultDiv.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}

// Обработчик нажатия кнопки "Конвертировать"
convertBtn.addEventListener('click', convertCurrency);

// Обработчик нажатия кнопки "Поменять местами"
const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () =>{
    let tempCode = currencyFromSelect.value; // временный код валюты выпадающего списка FROM
    currencyFromSelect.value = currencyToSelect.value; // передача кода валюты TO в код валюты FROM
    currencyToSelect.value = tempCode; // передача временного кода валюты в код валюты TO
    convertCurrency();
});