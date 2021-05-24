"use strict";
//CONSTANTES
const inputText = document.querySelector(".js-text");
const btn = document.querySelector(".js-button");
const listShows = document.querySelector(".js-list");

//VARIABLES
// let shows = [];
let fav = [];

//LLAMAR A LA API
function callToApi() {
  fetch(`//api.tvmaze.com/search/shows?q=${inputText.value}`)
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
            <li id="${dataList.id}" class="js-card">
            <h2>${dataList.name}</h2>
            <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>
             </li>`;
    } else {
      listShows.innerHTML += `
        <li id="${dataList.id}" class="js-card">
        <h2>${dataList.name}</h2>
        <img src="${dataList.image.medium}"/>
         </li>`;
    }
  }
  addListenerToShows();
}

//FUNCIÓN MANEJADORA
function handlerClick(event) {
  event.preventDefault();
  callToApi();
}

//EVENTO
btn.addEventListener("click", handlerClick);

//FAVORITAS
function addListenerToShows() {
  const listShowsFav = document.querySelectorAll(".js-card");
  for (const listFav of listShowsFav) {
    listFav.addEventListener("click", handlerClickFav);
  }
}

function handlerClickFav(event) {
  const showCardFav = event.currentTarget;
  showCardFav.classList.toggle("favorite");
}

addListenerToShows();
