import './styles/main.scss';

let clientId = "OAX7jYHyzy2x5AYlCaB7Ia5X_2q-NTLHTNmmXwbws2E";
const buttonSearch = document.querySelector(".btn-search");
const buttonReload = document.querySelector(".btn-reload");
const carouselInner = document.querySelector(".carousel-inner");
const gallery = document.querySelector(".gallery");
const welcomeTile = document.querySelector('.welcome-tile');
let userName = document.querySelector("#search");
const slider = document.querySelector(".slider");

//Set random photo for a first user's view
function setRandomPhoto() {
  let newWelcomePhoto = document.createElement("img")
  fetch(`https://api.unsplash.com/photos/random/?client_id=${clientId}`)
    .then(resp => resp.json())
    .then(photo => {
        welcomeTile.appendChild(newWelcomePhoto).setAttribute("style", `background-image: url(${photo.urls.regular})`);
      }
    )
    .catch(error => console.log(error));
}

setRandomPhoto();




//Search user's photos
function searchPhotos() {
  welcomeTile.innerHTML = "";
  carouselInner.innerHTML = "";
  let userInfo = {
    photos: 0,
    pages: 0,
    photosPerPage: 20
  }

//request to the API
  fetch(`https://api.unsplash.com/users/${userName.value}/?client_id=${clientId}`)
    .then(resp => resp.json())
    .then(resp => {

      userInfo.photos = resp.total_photos;
      userInfo.pages = Math.ceil(userInfo.photos/userInfo.photosPerPage);

      gallery.classList.remove("hidden");

      if (userInfo.photos == 0) {
        gallery.classList.toggle("hidden");
        const newElement = document.createElement("div");
        newElement.classList.add("alert", "alert-warning", "alert-dismissible", "fade", "show");
        newElement.setAttribute("role", "alert");
        newElement.innerHTML = `
      This User has no photos! Try again!!!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      `
        slider.prepend(newElement);
      }

      loadPhotos()
    })
    .catch(error => {
      console.log(error);
      gallery.classList.toggle("hidden");
      const newElement = document.createElement("div");
      newElement.classList.add("alert", "alert-warning", "alert-dismissible", "fade", "show");
      newElement.setAttribute("role", "alert");
      newElement.innerHTML = `
      Couldn't find that User. Try again!!!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      `
      slider.prepend(newElement);
    });


  function loadPhotos() {
    console.log(userInfo.pages)
    const photosPromises = new Array(userInfo.pages).fill(null).map((_, index) => {
      const request = fetch(`https://api.unsplash.com/users/${userName.value}/photos?per_page=${userInfo.photosPerPage}&page=${index+1}&client_id=${clientId}`, {
        method: 'GET'
      })
      return request.then(response => response.json())
        .then(resp => resp.map(element => element.urls.regular))
    })

  Promise
    .all(photosPromises)
    .then(resp => resp.map((arrayElement,idx) => {
      if (idx == 0) {
        arrayElement.map((photo,idx) => {

          if (idx == 0) {
            let galleryElement = `<img style="background-image: url(${photo})" class="d-block w-100">`
            const newElement = document.createElement("div");
            carouselInner.appendChild(newElement).innerHTML = galleryElement;
            newElement.classList.add("carousel-item", "active");
          } else {
            let galleryElement = `<img style="background-image: url(${photo})" class="d-block w-100">`
            const newElement = document.createElement("div");
            carouselInner.appendChild(newElement).innerHTML = galleryElement;
            newElement.classList.add("carousel-item");
          }
      })
    }
      else {
        arrayElement.map(photo => {
            let galleryElement = `<img style="background-image: url(${photo})" class="d-block w-100">`
            const newElement = document.createElement("div");
            carouselInner.appendChild(newElement).innerHTML = galleryElement;
            newElement.classList.add("carousel-item");
          })
        }



      })
    )
  }




  // userName.value = "";
  buttonSearch.setAttribute("disabled", "true");
}

//Key press effects
userName.addEventListener('keyup', function(event) {
  //Search by press Enter key
  if (event.keyCode === 13) {
    event.preventDefault();
    buttonSearch.click();
  }
  //Validate input value
  else if (userName.value.trim() != "") {
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

//
// import './styles/main.scss';
//
// let clientId = "OAX7jYHyzy2x5AYlCaB7Ia5X_2q-NTLHTNmmXwbws2E";
// const buttonSearch = document.querySelector(".btn-search");
// const buttonReload = document.querySelector(".btn-reload");
// const carouselInner = document.querySelector(".carousel-inner");
// const gallery = document.querySelector(".gallery");
// const welcomeTile = document.querySelector('.welcome-tile');
// let userName = document.querySelector("#search");
// const slider = document.querySelector(".slider");
//
// //Set random photo for a first user's view
// function setRandomPhoto() {
//   let newWelcomePhoto = document.createElement("img")
//   fetch(`https://api.unsplash.com/photos/random/?client_id=${clientId}`)
//     .then(resp => resp.json())
//     .then(photo => {
//         welcomeTile.appendChild(newWelcomePhoto).setAttribute("style", `background-image: url(${photo.urls.regular})`);
//       }
//     )
//     .catch(error => console.log(error));
// }
//
// setRandomPhoto();
//
//
// //Search user's photos
// export function searchPhotos() {
//   welcomeTile.innerHTML = "";
//   carouselInner.innerHTML = "";
//   let perPage = {
//     photos: 0,
//   }
//   let url = `https://api.unsplash.com/users/${userName.value}/photos?per_page=${perPage.photos}&client_id=${clientId}`;
//   // let url = `https://api.unsplash.com/users/${userName.value}/photos?per_page=${perPage}&page=4&client_id=${clientId}`;
//   // let url = `https://api.unsplash.com/users/${userName.value}/?client_id=${clientId}`;
//
// //request to the API
//   fetch(`https://api.unsplash.com/users/${userName.value}/?client_id=${clientId}`)
//     .then(resp => resp.json())
//     .then(resp => {
//       perPage.photos = resp.total_photos;
//     })
//
//
//
//
//   fetch(url)
//     .then(resp => resp.json())
//     .then(resp => {
//         console.log(resp);
//
//         gallery.classList.remove("hidden");
//
//         if (resp.length < 1) {
//           gallery.classList.toggle("hidden");
//           const newElement = document.createElement("div");
//           newElement.classList.add("alert", "alert-warning", "alert-dismissible", "fade", "show");
//           newElement.setAttribute("role", "alert");
//           newElement.innerHTML = `
//       This User has no photos! Try again!!!
//       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//         <span aria-hidden="true">&times;</span>
//       </button>
//       `
//           slider.prepend(newElement);
//         }
//
//         resp.map((photo, idx) => {
//
//             if (idx == 0) {
//               let galleryElement = `<img style="background-image: url(${photo.urls.regular})" class="d-block w-100">`
//               const newElement = document.createElement("div");
//               carouselInner.appendChild(newElement).innerHTML = galleryElement;
//               newElement.classList.add("carousel-item", "active");
//             } else {
//               let galleryElement = `<img style="background-image: url(${photo.urls.regular})" class="d-block w-100">`
//               const newElement = document.createElement("div");
//               carouselInner.appendChild(newElement).innerHTML = galleryElement;
//               newElement.classList.add("carousel-item");
//             }
//           }
//         )
//       }
//     )
//     .catch(error => {
//       console.log(error);
//       gallery.classList.toggle("hidden");
//       const newElement = document.createElement("div");
//       newElement.classList.add("alert", "alert-warning", "alert-dismissible", "fade", "show");
//       newElement.setAttribute("role", "alert");
//       newElement.innerHTML = `
//       Couldn't find that User. Try again!!!
//       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//         <span aria-hidden="true">&times;</span>
//       </button>
//       `
//       slider.prepend(newElement);
//     });
//   // userName.value = "";
//   buttonSearch.setAttribute("disabled", "true");
// }
//
// //Key press effects
// userName.addEventListener('keyup', function(event) {
//   //Search by press Enter key
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     buttonSearch.click();
//   }
//   //Validate input value
//   else if (userName.value.trim() != "") {
//     buttonSearch.removeAttribute("disabled");
//     buttonReload.removeAttribute("disabled");
//   }
//   else {
//     buttonSearch.setAttribute("disabled", "true");
//     buttonReload.setAttribute("disabled", "true");
//   }
// })
//
// buttonSearch.addEventListener("click", () => searchPhotos(userName));
// buttonReload.addEventListener("click", () => searchPhotos(userName));



