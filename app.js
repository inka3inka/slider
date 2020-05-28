import './main.scss';

let clientId = "OAX7jYHyzy2x5AYlCaB7Ia5X_2q-NTLHTNmmXwbws2E";
const button = document.querySelector(".btn");
const carouselInner = document.querySelector(".carousel-inner");
const gallery = document.querySelector(".gallery");
const welcomeTile = document.querySelector('.welcome-tile');
let userName = document.querySelector("#search");

//Set random photo for a first user's view
function setRandomPhoto() {
  let newWelcomePhoto = document.createElement("img")
  fetch(`https://api.unsplash.com/photos/random/?client_id=${clientId}`)
    .then(resp => resp.json())
    .then(photo => {
        welcomeTile.appendChild(newWelcomePhoto).setAttribute("style", `background-image: url(${photo.urls.regular})`);
      }
    )
}

setRandomPhoto();


//Search user's photos
export function searchPhotos() {
  welcomeTile.innerHTML = "";
  carouselInner.innerHTML = "";
  let url = `https://api.unsplash.com/users/${userName.value}/photos/?client_id=${clientId}`;

//request to the API


  fetch(url)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      resp.map((photo, idx) => {
          if (idx == 0) {
            let galleryElement = `<img style="background-image: url(${photo.urls.regular})" class="d-block w-100">`
            const newElement = document.createElement("div");
            carouselInner.appendChild(newElement).innerHTML = galleryElement;
            newElement.classList.add("carousel-item", "active");
          } else {
            let galleryElement = `<img style="background-image: url(${photo.urls.regular})" class="d-block w-100">`
            const newElement = document.createElement("div");
            carouselInner.appendChild(newElement).innerHTML = galleryElement;
            newElement.classList.add("carousel-item");
          }
        }
      )
    }
  )
  userName.value = "";
  button.setAttribute("disabled", "true");
}

//Key press effects
userName.addEventListener('keyup', function(event) {
  //Search by press Enter key
  if (event.keyCode === 13) {
    event.preventDefault();
    button.click();
  }
  //Validate input value
  else if (userName.value.trim() != "") {
    button.removeAttribute("disabled")
  }
  else {
    button.setAttribute("disabled", "true")
  }
})

button.addEventListener("click", searchPhotos);
button.addEventListener("click", () => gallery.classList.remove("hidden"));


