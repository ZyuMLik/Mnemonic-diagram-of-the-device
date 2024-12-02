"use strict"

// Получаем все интерактивные элементы
const warning = document.querySelector(".warning");
const batteryTemperatureData = document.querySelector(".battery_temperature__data");
const voltageGroupBattery_01 = document.querySelectorAll(".voltage_group__data")[0];
const voltageElementBattery_01 = document.querySelectorAll(".voltage_element__data")[0];
const asymmetryData = document.querySelector(".asymmetry__data");
const voltageGroupBattery_02 = document.querySelectorAll(".voltage_group__data")[1];
const voltageElementBattery_02 = document.querySelectorAll(".voltage_element__data")[1];
const voltageAccumulatorData = document.querySelector(".voltage_accumulator__data");
const switchStatus = document.querySelector(".switch_status__off");
const fault = document.querySelector(".fault");
const faultInfo = document.querySelector(".fault__info");
const current = document.querySelector(".current");
const currentData = document.querySelector(".current__data");
const currentText = document.querySelector(".current__text");
const btnResetProtections = document.querySelector(".btn__reset_protections");

// класс батари, через который будем всё менять
class Battery {
    constructor(
        warning, 
        batteryTemperatureData,
        voltageGroupBattery_01,
        voltageElementBattery_01,
        asymmetryData,
        voltageGroupBattery_02,
        voltageElementBattery_02,
        voltageAccumulatorData,
        switchStatus,
        fault,
        faultInfo,
        current,
        currentData,
        currentText,
    ) {
        this.warning = warning, 
        this.batteryTemperatureData = batteryTemperatureData,
        this.voltageGroupBattery_01 = voltageGroupBattery_01,
        this.voltageElementBattery_01 = voltageElementBattery_01,
        this.asymmetryData = asymmetryData,
        this.voltageGroupBattery_02 = voltageGroupBattery_02,
        this.voltageElementBattery_02 = voltageElementBattery_02,
        this.voltageAccumulatorData = voltageAccumulatorData,
        this.switchStatus = switchStatus,
        this.fault = fault,
        this.faultInfo = faultInfo,
        this.current = current,
        this.currentData = currentData,
        this.currentText = currentText
    }
    batteryTemperatureDataMin = 0;
    batteryTemperatureDataMax = 20;
    asymmetryDataMin = 0;
    asymmetryDataMax = 10;

    update() {
        if(this.warning === "Предупреждений нет") {
            warning.innerHTML = `
            <div class="text_gray"> ${this.warning}</div>
            `;
            // warning.textContent = this.warning;
        } else {
            warning.innerHTML = `
            <div class="background_yellow"> ${this.warning.slice(0, 15)}</div> 
            <div> ${this.warning.slice(16)}</div>
            `;

        }
        
    }
    updateBackgroundColor() {

    }
}


// Запускаем функцию для получения данных устройства с нужным интервалом
// let updateData = setInterval(updateDataDevice, 100);

function updateDataDevice() {    
    // fetch(`/api/devices/1`)
    // .then(res => {
    //     if(res.ok){
    //         res.json()
    //     } 
    //     else {
    //         // Останавливаем setInterval в случае ошибки ответа от устройства
    //         clearInterval(updateData);
    //     }
    // })
    // .then(device => {
    //     // Обработка полученного объекта и изменение интерактивных элементов.
    //     // С помощью метода .textContent заменяем текст в интерактивных элементах.
    //     // С помощью .classList удаляем/добавляем классы в теги для подсветки нужным цветом
    //     // и изменения состояния включателя и заряда/разряда
    //     // в случае сбоя выводим надпись "АВАРИЯ" на красном фоне и причину аварии. 
    //     // также отображаем кнопку для сброса защиты (убираем класс .hidden с fault и btnResetProtections)

    //     // если обект приходит пустой отображаем данные по умолчанию

    //     // чтобы не загромождать, написать ещё несколько функций для изменения классов в интерактивных элементах
        
    // })

    // используем тестовые данные для изменения мнемосхемы


};

btnResetProtections.addEventListener("click", (e) => {
    e.preventDefault();
    // Логика сброса защиты
})

// тестовый класс в котором хранятся новые данные

const testBattery = new Battery(
    "Предупреждение. Неисправность датчика температуры АКБ",
    15, 
    115,
    27.7,
    2,
    105,
    13.125,
    220,
    "on",
    "off",
    "---",
    "charge",
    -50,
    "Ток (разряд)"
);
testBattery.update();
console.log(testBattery.currentText)








