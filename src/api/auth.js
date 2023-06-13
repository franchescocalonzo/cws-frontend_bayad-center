export function userValidated() {
  localStorage.setItem("user_status", "true");
  console.log("Setting the local storage done..");
}

export function isAuthenticated() {
  const status = localStorage.getItem("user_status");

  if (status) {
    return true;
  } else {
    return false;
  }
}

export function logout() {
  localStorage.removeItem("user_status");
  console.log("Removing the authentication from local storage is done..");
}

export default {
  isAuthenticated,
  userValidated,
  logout,
};
