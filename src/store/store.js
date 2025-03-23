const store = {
  isLoggedIn: Boolean(localStorage.getItem("user")),
  user: localStorage.getItem("user") ?? {
    username: "",
    email: "",
    bio: "",
  },
};

export default store;
