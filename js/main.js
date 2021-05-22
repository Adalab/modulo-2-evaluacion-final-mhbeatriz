"use strict";
//CONSTANTES
const inputText = document.querySelector(".js-text");
const btn = document.querySelector(".js-button");
const listShows = document.querySelector(".js-list");

//VARIABLES
// let shows = [];

//LLAMAR A LA API
function callToApi() {
  fetch(`https://api.tvmaze.com/search/shows?q=${inputText.value}`)
    .then((response) => response.json())
    .then((data) => {
      paintShows(data);
    });
}

//PINTAR SERIES
function paintShows(data) {
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].show);
    const dataList = data[i].show;

    if (dataList.image === null) {
      listShows.innerHTML += `
            <li class="movie_list-item">
            <h2 class="movie_title">${dataList.name}</h2>
            <img src="https://via.placeholder.com/150"/>
             </li>`;
    } else {
      listShows.innerHTML += `
        <li class="movie_list-item">
        <h2 class="movie_title">${dataList.name}</h2>
        <img src="${dataList.image.medium}"/>
         </li>`;
    }
  }
}

//FUNCIÓN MANEJADORA
function handlerClick(event) {
  event.preventDefault;
  callToApi();
}

//EVENTO
btn.addEventListener("click", handlerClick);
