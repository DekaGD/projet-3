const reponse = await fetch("http://localhost:5678/api/categories");
const filtres = await reponse.json();


const reponse2 = await fetch("http://localhost:5678/api/works");
const oeuvres = await reponse2.json();

const sectionGallery = document.querySelector(".gallery");

const sectionfiltres = document.querySelector("#filtres");

const filtresTous = document.getElementById("Tous");
filtresTous.addEventListener("click", (event) => {
  console.log(event.target.value);

  const objetsTrier = oeuvres.filter((oeuvre) => {
    console.log(oeuvre);
    return oeuvre.categoryId === 1, 2, 3;
  });

  while (sectionGallery.firstChild) {
    sectionGallery.removeChild(sectionGallery.firstChild);
  }
  for (const objet of objetsTrier) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = objet.imageUrl;
    img.alt = objet.title;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = objet.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    sectionGallery.appendChild(figure);
  }
});

const filtresObjets = document.getElementById("Objets");
filtresObjets.addEventListener("click", (event) => {
  console.log(event.target.value);

  const objetsTrier = oeuvres.filter((oeuvre) => {
    console.log(oeuvre);
    return oeuvre.categoryId === 1;
  });

  while (sectionGallery.firstChild) {
    sectionGallery.removeChild(sectionGallery.firstChild);
  }
  for (const objet of objetsTrier) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = objet.imageUrl;
    img.alt = objet.title;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = objet.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    sectionGallery.appendChild(figure);
  }
});

const filtresAppartements = document.getElementById("Appartements");
filtresAppartements.addEventListener("click", (event) => {
  console.log(event.target.value);

  const objetsTrier = oeuvres.filter((oeuvre) => {
    console.log(oeuvre);
    return oeuvre.categoryId === 2;
  });

  while (sectionGallery.firstChild) {
    sectionGallery.removeChild(sectionGallery.firstChild);
  }
  for (const objet of objetsTrier) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = objet.imageUrl;
    img.alt = objet.title;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = objet.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    sectionGallery.appendChild(figure);
  }
});

const filtresHotels = document.getElementById("Hotels");
filtresHotels.addEventListener("click", (event) => {
  console.log(event.target.value);

  const objetsTrier = oeuvres.filter((oeuvre) => {
    console.log(oeuvre);
    return oeuvre.categoryId === 3;
  });

  while (sectionGallery.firstChild) {
    sectionGallery.removeChild(sectionGallery.firstChild);
  }
  for (const objet of objetsTrier) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = objet.imageUrl;
    img.alt = objet.title;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = objet.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    sectionGallery.appendChild(figure);
  }
});


