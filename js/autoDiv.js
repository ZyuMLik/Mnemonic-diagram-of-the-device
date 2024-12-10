"use strict";

// тестовое описание интерактивных элементов элементов
const interactiveElementTestData = {
    tAKB: "background_gray",
    voltageGroupBattery_01: "background_gray",
    voltageElementBattery_01: "background_gray",
    asymmetryData: "background_gray",
    voltageGroupBattery_02: "background_gray",
    voltageElementBattery_02: "background_gray",
    voltageAccumulatorData: "background_gray",
    current: "background_gray",
    btn_reset: "btn__reset"
}




window.onload = () => {
    const svgSchema = document.querySelector("#svgSchema");

    // Обрабатываем JSON с ID интерактивных элементов
    Object.keys(interactiveElementTestData).forEach(keyJson => {

        // Генерируем div с ID из JSON
        divGenerate(svgSchema, keyJson);

        // Получаем svg элемент и добавляем его свойства в div
        const svgElement = svgSchema.contentDocument.querySelector(`#${keyJson}`);
        
        // Получаем новый div по id для подгонки под svg
        const div = document.querySelector(`#${keyJson}`);
        
        Object.assign(div.style, {
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: `${svgElement.attributes.width.value}px`,
            height: `${svgElement.attributes.height.value}px`,
            left: `${svgElement.attributes.x.value}px`,
            top: `${svgElement.attributes.y.value}px`,
            borderRadius: `${svgElement.attributes.rx.value}px`,           
            
        })

        // div.style.width = svgElement.attributes.width.value;
        // div.style.height = svgElement.attributes.height.value;


        // console.log(svgElement.attributes);
        // console.log(div);






    });
}

function divGenerate (svgSchema, key) {
    const div = document.createElement("div");

    div.classList.add(interactiveElementTestData[key]);
    // div.classList.add("position_absolute");
    div.setAttribute("id", key);
    svgSchema.insertAdjacentElement("afterend", div);
    div.textContent = "---";
    

}
