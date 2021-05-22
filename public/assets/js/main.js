"use strict";

console.log(">> Ready :)");
//constantes

const inputText = document.querySelector(".js-text");
const btn = document.querySelector(".js-button");
const listShows = document.querySelector(".js-list");

//variables
// let shows = [];

//llamar a la API
function callToApi() {
  fetch(`https://api.tvmaze.com/search/shows?q=${inputText.value}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].show);
        const dataList = data[i].show;

        if (dataList.image === null) {
          listShows.innerHTML += `
                <li>
                <h2>${dataList.name}</h2>
                <img src="https://via.placeholder.com/150"/>
                 </li>`;
        } else {
          listShows.innerHTML += `
            <li>
            <h2>${dataList.name}</h2>
            <img src="${dataList.image.medium}"/>
             </li>`;
        }
      }
    });
}

//pintar series
// function paintShows() {
//   listShows.innerHTML = "";
// }

//función manejadora
function handlerClick(event) {
  event.preventDefault;
  callToApi();
  //   paintShows();
}

//evento
btn.addEventListener("click", handlerClick);

//# sourceMappingURL=main.js.map
