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
      shows = data; //no estaba guardado los shows en la variable global
      paintShows(data);
      addListenerToShows(); //cam
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
    console.log(data[i].show);
    const dataList = data[i].show;
    //faltaban condicionales
    if (dataList.image) {
      listShows.innerHTML += `
          <li data-id="${dataList.id}" class="js-card">
            <h2>${dataList.name}</h2>
            <img src="${dataList.image.medium}"/>
          </li>`;
    } else {
      listShows.innerHTML += `
          <li data-id="${dataList.id}" class="js-card">
            <h2>${dataList.name}</h2>
             <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>
           </li>`;
    }
  }
}
function paintShowsFav(data) {
  // antes este data era un array de números y ahora llega un array de objetos
  listShowsFav.innerHTML = ``;
  for (let i = 0; i < data.length; i++) {
    const dataList = data[i].show;
    //faltaban condicionales
    if (dataList.image) {
      listShowsFav.innerHTML += `
              <li data-id="${dataList.id}" class="js-card">
                <h2>${dataList.name}</h2>
                <img src="${dataList.image.medium}"/>
              </li>`;
    } else {
      listShowsFav.innerHTML += `
              <li data-id="${dataList.id}" class="js-card">
                  <h2>${dataList.name}</h2>
                  <img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>
                  </li>`;
    }
  }
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
  //IDENTIFICAR LA LI PULSADA
  const showCardFav = event.currentTarget;
  showCardFav.classList.toggle("favorite");
  //OBTENER INFO ASOCIADA AL ARRAY FAV
  const showId = parseInt(showCardFav.dataset.id);
  //BUSCAR SI LA IMG CLICkADA ESTA EN FAV
  const show = shows.find((s) => s.show.id === showId);
  if (show === undefined) return;
  const isPresent = fav.find((favorite) => favorite.show.id === showId); //
  if (isPresent === undefined) {
    fav.push(show); // empujaba número no el id, ahora empuja objeto show
  } else {
    fav = fav.filter((favoriteId) => favorite.show.id !== showId);
  }
  paintShowsFav(fav); // no llamaba  a la función
}
addListenerToShows();
