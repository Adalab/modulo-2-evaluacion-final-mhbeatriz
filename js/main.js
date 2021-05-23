"use strict";
//CONSTANTES
const inputText = document.querySelector(".js-text");
const btn = document.querySelector(".js-button");
const listShows = document.querySelector(".js-list");

//VARIABLES
let shows = [];

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
            <div class="fav-container"><li>
            <h2 class="fav-title">${dataList.name}</h2>
            <img class="fav-image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>
             </li></div>`;
    } else {
      listShows.innerHTML += `
        <div class="fav-container"><li>
        <h2 class="fav-title">${dataList.name}</h2>
        <img class="fav-image" src="${dataList.image.medium}"/>
         </li></div>`;
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

//FILTRAR DATOS

// function filterData() {
//   const filter = inputText.value;

//   filterDataShow = shows.filter((show) => show.name.includes(inputText));

//   for (const showFav of filterDataShow) {
//     const item = document.createElement("li");
//     item.innerHTML = `${showFav.name} <img src=${showFav.image.medium} alt="image">`;
//     showList.appendChild(newItem);
//   }
// }

//FAVORITAS

// const listShowsFavorites = document.querySelector(".js-favorite");
// let favoriteShows = [];
// for (let i = 0; i < favoriteShows.length; i++) {}

function handlerClickFav(event) {
  const whereTheUserClicked = event.currentTarget;
  whereTheUserClicked.classList.toggle("favorite");
}
function addFavoriteShow() {
  const listShowsFavorites = document.querySelectorAll(".js-list");
  for (const favShows of listShowsFavorites) {
    favShows.classList.add("favorite");
    favShows.addEventListener("click", handlerClickFav);
  }
}
