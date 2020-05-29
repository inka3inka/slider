import './styles/main.scss';
import {alertTrigger, createPhotoElement} from "./utiles";

const clientId = "OAX7jYHyzy2x5AYlCaB7Ia5X_2q-NTLHTNmmXwbws2E";
const userName = document.querySelector("#search");
const buttonSearch = document.querySelector(".btn-search");
const buttonReload = document.querySelector(".btn-reload");
const slider = document.querySelector(".slider");
const welcomeTile = document.querySelector('.welcome-tile');
const gallery = document.querySelector(".gallery");
const carouselInner = document.querySelector(".carousel-inner");
const userInfo = {
  numberOfPhotos: 0,
  numberOfPages: 0,
  photosPerPage: 20
};


//Set random photo for a first user's view

function setRandomPhoto() {

  let newWelcomePhoto = document.createElement("img");
  let url = `https://api.unsplash.com/photos/random/?client_id=${clientId}`;
  fetch(url,{method: 'GET'})
    .then(resp => resp.json())
    .then(photo => {
      const randomPhoto = welcomeTile.appendChild(newWelcomePhoto);
      randomPhoto.setAttribute("style", `background-image: url(${photo.urls.regular})`);
      }
    )
    .catch(error => console.log(error));
}

setRandomPhoto();


//Search user's photos

function searchPhotos() {

  //Reset slider's elements
  welcomeTile.innerHTML = "";
  carouselInner.innerHTML = "";
  gallery.classList.remove("hidden");
  let url = `https://api.unsplash.com/users/${userName.value}/?client_id=${clientId}`;

  //Fetch basic info about searched User
  fetch(url, { method: 'GET'})
    .then(resp => resp.json())
    .then(resp => {
      userInfo.numberOfPhotos = resp.total_photos;
      userInfo.numberOfPages = Math.ceil(userInfo.numberOfPhotos / userInfo.photosPerPage);

      //Alert handler - case: User has no photos / User has photos
      userInfo.numberOfPhotos === 0
        ? alertTrigger ("This User has no photos", gallery, slider)
        : loadPhotos()
    })
    .catch(error => {
      console.log(error);
      alertTrigger ("Couldn't find that User", gallery, slider)
    });

  // userName.value = "";
  //Disable Search button
  buttonSearch.setAttribute("disabled", "true");
}


//Function - Load User's photos

function loadPhotos() {

  const photosPromises = new Array(userInfo.numberOfPages)
    .fill(null)
    .map((_, index) => {
    const request = fetch(`https://api.unsplash.com/users/${userName.value}/photos?per_page=${userInfo.photosPerPage}&page=${index+1}&client_id=${clientId}`, {
      method: 'GET'
    });

    return request
      .then(response => response.json())
      .then(resp => resp.map(element => element.urls.regular))
  })

  Promise
    .all(photosPromises)
    .then(resp => resp.map((arrayElement,idx) => {
        if (idx === 0) {
          arrayElement.map((photo,idx) => {
            idx === 0 ? createPhotoElement(photo, carouselInner, "active") : createPhotoElement(photo, carouselInner)
          })
        }
        else {
          arrayElement.map(photo => {
            createPhotoElement(photo, carouselInner)
          })
        }
      })
    )
}


//Key press effects
userName.addEventListener('keyup', function(event) {
  //Search by press Enter key
  if (event.keyCode === 13) {
    event.preventDefault();
    buttonSearch.click();
  }
  //Validate input value
  else if (userName.value.trim() !== "") {
    buttonSearch.removeAttribute("disabled");
    buttonReload.removeAttribute("disabled");
  }
  else {
    buttonSearch.setAttribute("disabled", "true");
    buttonReload.setAttribute("disabled", "true");
  }
})

buttonSearch.addEventListener("click", () => searchPhotos(userName));
buttonReload.addEventListener("click", () => searchPhotos(userName));