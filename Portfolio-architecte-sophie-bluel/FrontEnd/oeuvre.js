import { isAuthenticated } from "./utils.js";

const reponse = await fetch("http://localhost:5678/api/works");
const oeuvres = await reponse.json();

// Get gallery Mes Projets
const sectionGallery = document.querySelector(".gallery");
// Get gallery de la modale 1
const portfolios = document.querySelector(".portfolios");

const token = sessionStorage.getItem("token"); // Récupérer le token depuis le localStorage



// Récuperer dynamiquement les éléments du DOM



for (const article of oeuvres) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = article.imageUrl;
  img.alt = article.title;
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = article.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);
  sectionGallery.appendChild(figure);
}


if (isAuthenticated()) {
  displayLogoutBouton();
  displayButtonAdminProjets();
  displayAdminBar();
  addModalImages(oeuvres);
  openModals();
  deleteGalery();
  insererCategoryModal2();
  addProject();
  switchModal();
} else {
  displayLoginBouton();
}


function addModalImages(oeuvres) {
  const elementParent = document.getElementById("portfolios");

  for (const article of oeuvres) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = article.imageUrl;
    img.alt = article.title;
    img.classList.add("image-portfolio")

    const trashIcon = document.createElement("img");
    trashIcon.classList.add("icone");
    trashIcon.src = "../FrontEnd/assets/icons/trash-icon.png";
    trashIcon.id = article.id;

    const textImage = document.createElement("span");
    textImage.textContent = 'editer';
    
    

    trashIcon.addEventListener("click", () => {
      let workID = article.id;
      deleteWorks(workID);
    });

    figure.appendChild(trashIcon);
    figure.appendChild(img);
    figure.appendChild(textImage);
    elementParent.appendChild(figure);

  }

}

function openModal1() {
  const modal = document.getElementById("modal1");
  modal.style.display = "flex";
}



function closeModal() {
  const modal = document.getElementById("modal1");
  modal.style.display = "none";
}

function closeModal2() {
  const modal2 = document.getElementById("modal2");
  modal2.style.display = "none";
}



async function  openModal2() {
  const modal2 = document.getElementById("modal2");
  modal2.style.display = "flex";
  
}

async function insererCategoryModal2() {
  const modalCategory = document.getElementById("categoryModal");
  const reponse = await fetch("http://localhost:5678/api/categories");
  const categorys = await reponse.json();
  for(const category of categorys) {
    const option = document.createElement("option");
    option.value = category.id;
    option.text = category.name;
    modalCategory.appendChild(option);  }
}

function openModals() {
  const elementsBouton = document.getElementById("addPicture");
  console.log(openModals)
  elementsBouton.style.display = "flex";
  elementsBouton.addEventListener("click", openModal2);
}

function displayButtonAdminProjets() {
  const elementBouton = document.getElementById("projectsAdmin");
  elementBouton.style.display = "flex";
  elementBouton.addEventListener("click", openModal1);

  const elementCloseModal = document.getElementById("closeModal");
  elementCloseModal.addEventListener("click", closeModal);

  const elementCloseModal2 = document.getElementById("closeModal2");
  elementCloseModal2.addEventListener("click", closeModal);

}


function switchModal() {
  const switchModals = document.getElementById("switch-to-modal1");
  switchModals.addEventListener("click", closeModal2)
}

function displayAdminBar() {
  const adminBar = document.getElementById("adminBar");
  adminBar.style.display = "flex";
}

function displayLogoutBouton() {
  const logoutButton = document.createElement("li");
  logoutButton.innerText = "Logout";
  logoutButton.id = "logoutButton";
  logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    location.reload(); // recharge la page après la déconnexion
  });
  // Remplacez le bouton de connexion par le bouton de déconnexion
  loginButton.parentNode.replaceChild(logoutButton, loginButton);
}

function displayLoginBouton() {
  // Si l'utilisateur n'est pas connecté, afficher "Login"
  const loginButton = document.getElementById("loginButton");
  loginButton.innerText = "Login";
  loginButton.addEventListener("click", () => {
    sessionStorage.setItem("token", data.token);
    location.reload();
  });
}


const deleteWorks = async (workID) => {
  await fetch("http://localhost:5678/api/works/" + workID, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).catch((error) => {
    console.log(error);
  });
}

function deleteGalery() {

  const deleteGallery = document.getElementById("deletePictures");
deleteGallery.addEventListener("click", function (event) {
  event.preventDefault();

  
  // On ouvre la boite de confirmation, si ok on delete
  if (confirm("Êtes-vous sûr de vouloir supprimer la galerie?") == true) {
    deleteWorks();
    // on récup toutes les figures de la galerie modale
    const figures = portfolios.querySelectorAll("figure");

    for (let i = 0; i < figures.length; i++) {
      // On récupère les data-id de chaque figure de la galerie modale
      const figureID = figures[i].getAttribute("data-id");
      //console.log(figureID);
      // on applique la fonction deleteWork a chaque projet
      deleteWorks(figureID);
    }
    console.log("La galerie a bien été supprimée !");
  }
})};



// Fonction pour afficher la photo uploadée dans la fenêtre
function displayUploadedPhoto(imageFile) {
  const reader = new FileReader();

  reader.onload = function() {
    const imgElement = document.createElement("img");
    imgElement.src = reader.result;

    const modal2 = document.getElementById("modal2");
    
    // Utiliser innerHTML pour remplacer le contenu par la nouvelle image
    modal2.innerHTML = '';
    modal2.innerHTML = imgElement.outerHTML;
  };

  reader.readAsDataURL(imageFile);
}

// Fonction pour gérer la prévisualisation de l'image
function handleImageUpload(event) {
  const previewImage = document.getElementById("previewImage");
  const selectedImage = event.target.files[0]; // Récupère le fichier sélectionné

  // Vérifie si un fichier a été sélectionné
  if (selectedImage) {
    const reader = new FileReader();

    // Quand le lecteur a fini de lire le fichier
    reader.onload = function() {
      // Met à jour la source de l'image pour afficher la prévisualisation
      previewImage.src = reader.result;
    };

    // Lis le contenu du fichier comme une URL de données (base64)
    reader.readAsDataURL(selectedImage);
  } else {
    // Réinitialise l'image de prévisualisation si aucun fichier n'est sélectionné
    previewImage.src = "";
  }
}

// Écoute l'événement "change" sur le champ d'upload d'image
const imageInput = document.getElementById("image");
imageInput.addEventListener("change", handleImageUpload);




// Fonction pour mettre à jour la galerie avec la nouvelle photo
function updateGalleryWithNewPhoto(data) {
  const gallery = document.querySelector(".gallery");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = data.imageUrl; // Supposons que l'objet data contient l'URL de la nouvelle photo
  img.alt = data.title; // Supposons que l'objet data contient le titre de la nouvelle photo
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = data.title; // Supposons que l'objet data contient le titre de la nouvelle photo

  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

// Fonction pour ajouter un projet
function addProject() {



  const buttonValider = document.getElementById("valider-button");
  buttonValider.addEventListener("click", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("categoryModal").value;
    const imageFile = document.getElementById("image").files[0];
    const token = sessionStorage.getItem("token"); // Récupérer le token depuis le localStorage

    // Afficher la photo uploadée dans la fenêtre
    displayUploadedPhoto(imageFile);

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("category", category);

    

    await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          updateGalleryWithNewPhoto();
          console.log("Votre projet a bien été ajouté !");
          return response.json();
        } else {
          console.log("Erreur dans la récupération des donnés de l'API");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

 








}






