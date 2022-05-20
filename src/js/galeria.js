document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  navegacionFija();
  crearGaleria();
  scrollNav();
}


function navegacionFija() {

  const header = document.querySelector("header");
  const body = document.querySelector("body");
  const sobreFestival = document.querySelector(".sobre-festival");

  window.addEventListener("scroll", function () {
    
    if(sobreFestival.getBoundingClientRect().bottom < 0){
      header.classList.add("fijar-header");
      body.classList.add("body-scroll");

    }else{
      header.classList.remove("fijar-header");
      body.classList.remove("body-scroll");
    }

  })

}

function scrollNav() {

  const enlaces = document.querySelectorAll(".nav a");

  enlaces.forEach(function (enlace) {
    enlace.addEventListener("click", function (e) {

      e.preventDefault();

      const seccionScroll = e.target.hash;

      const seccion = document.querySelector(seccionScroll);

      seccion.scrollIntoView({ behavior: "smooth"});

    });
  })

}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const img = document.createElement("picture");

    img.innerHTML = `
       <source srcset="build/img/thumb/${i}.webp" type="image/webp">

       <img src="build/img/thumb/${i}.jpg" alt="Imagen Galeria">
         `;

    img.onclick = function () {
      mostrarImg(i);
    };

    galeria.appendChild(img);
  }
}

function mostrarImg(id) {
  const img = document.createElement("picture");

  img.innerHTML = `
    <source srcset="build/img/grande/${id}.webp" type="image/webp">

    <img src="build/img/grande/${id}.jpg" alt="Imagen Galeria">
      `;

  const overlay = document.createElement("DIV");

  overlay.appendChild(img);

  overlay.classList.add("overlay");

  overlay.onclick = function() {
    overlay.remove();

    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
  }


    const cerrarModal = document.createElement("P");
    cerrarModal.innerHTML = "X";
    cerrarModal.classList.add("cerrar-modal");

    cerrarModal.onclick = function () {

        overlay.remove();

        const body = document.querySelector("body");
        body.classList.remove("fijar-body");

    }

    overlay.appendChild(cerrarModal);

  const body = document.querySelector("body");

  body.appendChild(overlay);
  body.classList.add("fijar-body");





}
