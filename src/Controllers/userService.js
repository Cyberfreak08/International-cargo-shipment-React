export const saveUserToLocalStorage = (user) => {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("loggedInUser");
  return user ? JSON.parse(user) : null;
};
