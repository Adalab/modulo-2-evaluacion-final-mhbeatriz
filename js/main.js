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
      shows = data;
      paintShows(data);
    });
}
//PINTAR SERIES
// function paintShows(data) {
//   for (let i = 0; i < data.length; i++) {
//     //console.log(data[i].show);
//     const dataList = data[i].show;
//     //buscar si la paleta que se está pintando esta en favoritos
//     const isPresent = fav.find((favoriteId) => favoriteId.show.id === dataList.id);
//     let classFavorite = "";
//     if (isPresent === undefined) {
//       classFavorite = "";
//     } else {
//       classFavorite = "favorite";
//     }
//     if (dataList.image === null) {
//       listShows.innerHTML += `
//             <li data-id="${dataList.id}" class="js-card">
//             <h2>${dataList.name}</h2>
//             <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>
//              </li>`;
//     } else {
//       listShows.innerHTML += `
//         <li data-id="${dataList.id}" class="js-card">
//         <h2>${dataList.name}</h2>
//         <img src="${dataList.image.medium}"/>
//          </li>`;
//     }
//   }
// }
function paintShows(data) {
  listShows.innerHTML = ``;
  if (data.length === 0) {
    listShows.innerHTML = `<li><p>vacio</p></li>`;
    return;
  }
  for (let i = 0; i < data.length; i++) {
    let htmlCode = "";
    console.log(data[i].show);
    const dataList = data[i].show;
    //fav.find((favorite) => favorite.show.id === showId);
    const isPresent = undefined;
    if (isPresent === undefined) {
      htmlCode += `<li data-id="${dataList.id}" class="js-card">`;
    } else {
      htmlCode += `<li data-id="${dataList.id}" class="js-card favorite">`;
    }

    htmlCode += `<h2 class="nameShow">${dataList.name}</h2>`;

    if (dataList.image) {
      htmlCode += `
            <img src="${dataList.image.medium}"/>`;
    } else {
      htmlCode += `
             <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>`;
    }
    htmlCode += `</li>`;
    listShows.innerHTML += htmlCode;
  }
  addListenerToShows();
}
function paintShowsFav(data) {
  listShowsFav.innerHTML = ``;
  for (let i = 0; i < data.length; i++) {
    const dataList = data[i].show;

    if (dataList.image) {
      listShowsFav.innerHTML += `
              <li>
                <h2 class="nameShow">${dataList.name}</h2>
                <button data-id="${dataList.id}" type= "button" class="buttonX js-card">X</button>
                <img src="${dataList.image.medium}"/>
              </li>`;
    } else {
      listShowsFav.innerHTML += `
              <li>
                  <h2 class="nameShow">${dataList.name}</h2>
                  <button data-id="${dataList.id}" type= "button" class="buttonX js-card">X</button>
                  <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>
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
  //showCardFav.classList.toggle("favorite");
  //obtener info asociada al array
  const showId = parseInt(showCardFav.dataset.id);
  //buscar si la li clickada está en favoritos
  const show = shows.find((s) => s.show.id === showId);
  //if (show === undefined) return;
  const isPresent = fav.find((favorite) => favorite.show.id === showId);
  if (isPresent === undefined) {
    fav.push(show);
  } else {
    fav = fav.filter((favorite) => favorite.show.id !== showId);
  }
  paintShowsFav(fav);
  setLocalStorage();
}

//LOCAL STORAGE
//add localStorage
function setLocalStorage() {
  localStorage.setItem("fav", JSON.stringify(fav));
}

//get localStorage
function getLocalStorage() {
  let getLocalFav = localStorage.getItem("fav");
  if (getLocalFav === null) {
    fav = [];
  } else {
    const array = JSON.parse(getLocalFav);
    fav = array;
    paintShowsFav(fav);
  }
}
getLocalStorage();

// REMOVE FUNCTIONS;

//all
const resetBtn = document.querySelector(".reset");
function removeFavs() {
  fav = [];
  setLocalStorage();
  paintShowsFav(fav);
}
resetBtn.addEventListener("click", removeFavs);

//individual
/*function removeIndividual(event) {
  debugger;
  const btnX = event.target.getAttribute(".buttonX");
  fav = [];
  setLocalStorage();
  paintShowsFav(fav);
}
listShowsFav.addEventListener("click", removeIndividual);*/
