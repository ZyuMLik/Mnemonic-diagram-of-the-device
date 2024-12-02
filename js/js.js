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


// Запускаем функцию для получения данных устройства с нужным интервалом
let updateData = setInterval(updateDataDevice, 100);

function updateDataDevice() {    
    fetch(`/api/devices/1`)
    .then(res => {
        if(res.ok){
            res.json()
        } 
        else {
            // Останавливаем setInterval в случае ошибки ответа от устройства
            clearInterval(updateData);
        }
    })
    .then(device => {
        // Обработка полученного объекта и изменение интерактивных элементов.
        // С помощью метода .textContent заменяем текст в интерактивных элементах.
        // С помощью .classList удаляем/добавляем классы в теги для подсветки нужным цветом
        // и изменения состояния включателя и заряда/разряда
        // в случае сбоя выводим надпись "АВАРИЯ" на красном фоне и причину аварии. 
        // также отображаем кнопку для сброса защиты (убираем класс .hidden с fault и btnResetProtections)

        // если обект приходит пустой отображаем данные по умолчанию

        // чтобы не загромождать, написать ещё несколько функций для изменения классов в интерактивных элементах
        
    })
};

btnResetProtections.addEventListener("click", (e) => {
    e.preventDefault();
    // Логика сброса защиты
})








