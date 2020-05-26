import './main.scss';

let button = document.querySelector(".btn");

export function searchPhotos() {
  let clientId = "OAX7jYHyzy2x5AYlCaB7Ia5X_2q-NTLHTNmmXwbws2E";
  let query = document.querySelector("#search").value;
  let url = `https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${query}`;



//request to the API



fetch(url)
  .then(resp => resp.json())
  .then(resp => {
    console.log(resp);
    resp.results.map(photo => {

      let gallery = `
        <img src="${photo.urls.regular}">
        <a href="${photo.links.download}"></a>
      `

      document.querySelector(".result").innerHTML = gallery

    })
  })


}

button.addEventListener("click", searchPhotos);