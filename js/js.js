"use strict";

// Получаем все интерактивные элементы
const warning = document.querySelector(".warning");
const batteryTemperatureData = document.querySelector(
    ".battery_temperature__data"
);
const voltageGroupBattery_01 = document.querySelectorAll(
    ".voltage_group__data"
)[0];
const voltageElementBattery_01 = document.querySelectorAll(
    ".voltage_element__data"
)[0];
const asymmetryData = document.querySelector(".asymmetry__data");
const voltageGroupBattery_02 = document.querySelectorAll(
    ".voltage_group__data"
)[1];
const voltageElementBattery_02 = document.querySelectorAll(
    ".voltage_element__data"
)[1];
const voltageAccumulatorData = document.querySelector(
    ".voltage_accumulator__data"
);
const switchStatus = document.querySelector(".switch_status__off");
const fault = document.querySelector(".fault");
const faultInfo = document.querySelector(".fault__info");
const current = document.querySelector(".current");
const currentData = document.querySelector(".current__data");
const currentText = document.querySelector(".current__text");
const btnResetProtections = document.querySelector(".btn__reset_protections");

window.onload = () => {
    const svgSchema = document.querySelector("#svgSchema").contentDocument;
    const tAKB = svgSchema.querySelector("#tAKB");
    console.log(tAKB);
    const rectAll = svgSchema.querySelectorAll("rect");
    console.log(svgSchema);
    console.log(rectAll);
}

// const svgSchema = document.querySelector("#svgSchema").contentDocument;
// const tAKB = svgSchema.querySelector("#tAKB");
// // const tAKB_text = svgSchema.querySelector("#tAKB_text");
// // const tAKB_group = svgSchema.querySelector("#tAKB_group");
// const btn_reset = svgSchema.querySelector("#btn_reset");
// console.log(tAKB);
// const rectAll = svgSchema.querySelector("#Слой_x0020_1");
// console.log(svgSchema);
// console.log(rectAll); 


const tAKB_div = document.createElement("div");
const btn_reset_div = document.createElement("button");

tAKB_div.classList.add("div__interactive_element");
btn_reset_div.classList.add("btn__reset_protections_position");

document
    .querySelector("#svgSchema")
    .insertAdjacentElement("afterend", tAKB_div)
    .insertAdjacentElement("afterend", btn_reset_div);

tAKB_div.textContent = "+15°C";
btn_reset_div.textContent = "СБРОС ЗАЩИТ";

// tAKB.attributes.fill.value = "yellow";
// tAKB_text.attributes.setNamedItem(document.createAttribute("text-anchor"));
// tAKB_text.attributes.getNamedItem("text-anchor").value = "middle";

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
        currentText
    ) {
        (this.warning = warning),
            (this.batteryTemperatureData = batteryTemperatureData),
            (this.voltageGroupBattery_01 = voltageGroupBattery_01),
            (this.voltageElementBattery_01 = voltageElementBattery_01),
            (this.asymmetryData = asymmetryData),
            (this.voltageGroupBattery_02 = voltageGroupBattery_02),
            (this.voltageElementBattery_02 = voltageElementBattery_02),
            (this.voltageAccumulatorData = voltageAccumulatorData),
            (this.switchStatus = switchStatus),
            (this.fault = fault),
            (this.faultInfo = faultInfo),
            (this.current = current),
            (this.currentData = currentData),
            (this.currentText = currentText);
    }
    batteryTemperatureDataMin = 0;
    batteryTemperatureDataMax = 20;
    asymmetryDataMin = 0;
    asymmetryDataMax = 10;
    backgroundColors = [
        "background_red",
        "background_blue",
        "background_yellow",
        "background_gray",
    ];

    update() {
        if (this.warning === "Предупреждений нет") {
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

        this.updateElementAndBackgroundColor(
            batteryTemperatureData,
            this.checkColor(
                this.batteryTemperatureData,
                this.batteryTemperatureDataMin,
                this.batteryTemperatureDataMax
            ),
            this.batteryTemperatureData + "°C"
        );

        voltageGroupBattery_01.textContent = this.voltageGroupBattery_01 + " V";
        voltageElementBattery_01.textContent =
            this.voltageElementBattery_01 + " V/e";
        this.updateElementAndBackgroundColor(
            asymmetryData,
            this.checkColor(
                this.asymmetryData,
                this.asymmetryDataMin,
                this.asymmetryDataMax
            ),
            this.asymmetryData + "%"
        );
        voltageGroupBattery_02.textContent = this.voltageGroupBattery_02 + " V";
        voltageElementBattery_02.textContent =
            this.voltageElementBattery_02 + " V/e";
        voltageAccumulatorData.textContent = this.voltageAccumulatorData + " V";

        switchStatus.parentElement.classList.remove("hidden");
        if (this.switchStatus === "on") {
            switchStatus.classList.remove("switch_status__off");
            switchStatus.classList.add("switch_status__on");
        } else {
            switchStatus.classList.remove("switch_status__on");
            switchStatus.classList.add("switch_status__off");
        }

        if (this.fault === "on") {
            fault.classList.remove("hidden");
            faultInfo.textContent = this.faultInfo;
            btnResetProtections.classList.remove("hidden");
        }
        current.classList.remove("hidden");
        if (this.current === "charge") {
            current.classList.remove("rotate");
        } else current.classList.add("rotate");

        currentData.textContent = this.currentData;
        currentText.textContent = this.currentText;
    }
    updateElementAndBackgroundColor(element, colorNew, text) {
        element.textContent = text;
        if (element.classList.contains(colorNew)) return;
        this.backgroundColors.forEach((colorOld) => {
            if (element.classList.contains(colorOld)) {
                element.classList.remove(colorOld);
                element.classList.add(colorNew);
            }
        });
    }

    checkColor(numNew, numMin, numMax) {
        if (numNew < numMin) {
            return "background_blue";
        } else if (numNew > numMax) {
            return "background_red";
        } else {
            return "background_yellow";
        }
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
}

btnResetProtections.addEventListener("click", (e) => {
    e.preventDefault();
    // Логика сброса защиты
});

// тестовый класс в котором хранятся новые данные

const testBattery = new Battery(
    "Предупреждение. Неисправность датчика температуры АКБ",
    "+15",
    115,
    27.7,
    12,
    105,
    13.125,
    220,
    "off",
    "on",
    "АЛЯРМ!",
    "charge",
    "+50",
    "Ток (заряд)"
);

testBattery.update();
