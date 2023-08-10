const username = document.getElementById("username");
const password = document.getElementById("pass");
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Soumission formulaire");

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: username.value,
      password: password.value,
    }),
  })
    .then((response) => {
      // C'est ok
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Si on est bien connecté
      if (data.token) {
        sessionStorage.setItem("token", data.token);
        document.location.href = "/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
      } else {
        // Si problème de connexion
        console.log("TOKEn pas ok");
      }
    });
});