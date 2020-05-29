//Alert handler
export function alertTrigger (message, gallery, slider) {
  gallery.classList.toggle("hidden");
  const newElement = document.createElement("div");
  newElement.classList.add("alert", "alert-warning", "alert-dismissible", "fade", "show");
  newElement.setAttribute("role", "alert");
  newElement.innerHTML = `${message} Try again!!!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>`;
  slider.prepend(newElement);
}

export function createPhotoElement(photo, carouselInner, classes) {
  let galleryElement = `<img style="background-image: url(${photo})" class="d-block w-100">`
  const newElement = document.createElement("div");
  carouselInner.appendChild(newElement).innerHTML = galleryElement;
  newElement.classList.add("carousel-item", classes);
}

