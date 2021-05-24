"use strict";
//CONSTANTES
const inputText = document.querySelector(".js-text");
const btn = document.querySelector(".js-button");
const listShows = document.querySelector(".js-list");
const listShowsFav = document.querySelector(".js-listFav");
const form = document.querySelector(".form");

//VARIABLES
let shows = [];
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
    //buscar si la paleta que se está pintando esta en favoritos
    // const isPresent = fav.find((favoriteId) => favoriteId === dataList.id);
    // let classFavorite = "";
    // if (isPresent === undefined) {
    //   classFavorite = "";
    // } else {
    //   classFavorite = "favorite";
    // }

    if (dataList.image === null) {
      listShows.innerHTML += `
            <li data-id="${dataList.id}" class="js-card">
            <h2>${dataList.name}</h2>
            <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>
             </li>`;
    } else {
      listShows.innerHTML += `
        <li data-id="${dataList.id}" class="js-card">
        <h2>${dataList.name}</h2>
        <img src="${dataList.image.medium}"/>
         </li>`;
    }

    // if (dataList.image === null) {
    //   listShowsFav.innerHTML += `
    //         <li data-id="${dataList.id}" class="js-card favorite">
    //         <h2>${dataList.name}</h2>
    //         <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>
    //          </li>`;
    // } else {
    //   listShows.innerHTML += `
    //     <li data-id="${dataList.id}" class="js-card favorite">
    //     <h2>${dataList.name}</h2>
    //     <img src="${dataList.image.medium}"/>
    //      </li>`;
    // }
  }
  addListenerToShows();
}

//FUNCIÓN MANEJADORA
function handlerClick(event) {
  event.preventDefault();
  callToApi();
}

//EVENTO
form.addEventListener("submit", handlerClick);
btn.addEventListener("click", handlerClick);

//FAVORITAS
function addListenerToShows() {
  const listShowsFav = document.querySelectorAll(".js-card");
  for (const listFav of listShowsFav) {
    listFav.addEventListener("click", handlerClickFav);
  }
}
function handlerClickFav(event) {
  //identificar la li pulsada
  const showCardFav = event.currentTarget;
  showCardFav.classList.toggle("favorite");

  //obtener info asociada al array fav
  const showId = showCardFav.dataset.id;

  //buscar si la img clickada esta en favoritos
  const isPresent = fav.find((favoriteId) => favoriteId === showId);
  if (isPresent === undefined) {
    fav.push(parseInt(showId));
  } else {
    fav = fav.filter((favoriteId) => favoriteId !== parseInt(showId));
  }
  console.log(fav);
}

addListenerToShows();

// RESET
