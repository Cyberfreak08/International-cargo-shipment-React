export const saveUserToLocalStorage = (user) => {
  localStorage.setItem("loggedInUser", JSON.stringify(user[0]));
  console.log("User data", user);
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("loggedInUser");
  console.log("User data1", user);
  return user ? JSON.parse(user) : null;
};
