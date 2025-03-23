import Store from "../utils/Store";

class UserStore extends Store {
  constructor(initialState) {
    super(initialState);
  }

  isLoggedIn() {
    return Boolean(this.state.user);
  }
}

const userStore = new UserStore({
  user: localStorage.getItem("user"),
});

export default userStore;
