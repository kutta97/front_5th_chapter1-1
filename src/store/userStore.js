import Store from "../utils/store.js";

class UserStore extends Store {
  constructor(initialState) {
    super(initialState);
  }

  isLoggedIn() {
    return Boolean(this.state.user);
  }
}

const userStore = new UserStore({
  user: JSON.parse(localStorage.getItem("user")),
});

export default userStore;
