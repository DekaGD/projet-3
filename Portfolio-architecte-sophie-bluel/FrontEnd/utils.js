// Renvoi true ou false si la personne est authentifiée
export function isAuthenticated() {
  const token = sessionStorage.getItem("token");
  if (token === null) {
    return false;
  } else {
    return true;
  }
}
