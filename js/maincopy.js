"use strict";
//CONSTANTES
const inputText = document.querySelector(".js-text");
const btn = document.querySelector(".js-button");
const listShows = document.querySelector(".js-list");
const listShowsFav = document.querySelector(".js-listFav");

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
  listShows.innerHTML = ``;
  if (data.length === 0) {
    listShows.innerHTML = `<li><p>vacio</p></li>`;
    return;
  }
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].show);
    const dataList = data[i].show;
    listShows.innerHTML += `
          <li data-id="${dataList.id}" class="js-card">
            <h2>${dataList.name}</h2>
             <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>
           </li>`;
    listShows.innerHTML += `
          <li data-id="${dataList.id}" class="js-card">
            <h2>${dataList.name}</h2>
            <img src="${dataList.image.medium}"/>
          </li>`;
  }
}
function paintShowsFav(data) {
  listShowsFav.innerHTML = ``;
  for (let i = 0; i < data.length; i++) {
    const dataList = data[i].show;
    listShowsFav.innerHTML += `
     <li data-id="${dataList.id}" class="js-card">
        <h2>${dataList.name}</h2>
        <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>
        </li>`;
    listShowsFav.innerHTML += `
          <li data-id="${dataList.id}" class="js-card favorite">
            <h2>${dataList.name}</h2>
            <img src="${dataList.image.medium}"/>
          </li>`;
  }
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
  //IDENTIFICAR LA LI PULSADA
  const showCardFav = event.currentTarget;
  showCardFav.classList.toggle("favorite");

  //OBTENER INFO ASOCIADA AL ARRAY FAV
  const showId = showCardFav.dataset.id;

  //BUSCAR SI LA IMG CLICKADA ESTA EN FAV
  const isPresent = fav.find((favoriteId) => favoriteId === showId);
  if (showId === undefined) {
    fav.push(showId);
  } else {
    fav = fav.filter((favoriteId) => favoriteId !== showId);
  }
  paintShows(data);
  console.log(fav);
}

addListenerToShows();
