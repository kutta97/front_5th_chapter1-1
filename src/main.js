import store from "./store/store.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import MainPage from "./pages/MainPage.js";
import ErrorPage from "./pages/ErrorPage.js";

document.addEventListener("click", (e) => {
  if (e.target.id === "logout" || e.target.closest("#logout")) {
    e.preventDefault();

    store.isLoggedIn = false;
    localStorage.removeItem("user");

    render();
  }
});

document.body.addEventListener("submit", (e) => {
  if (e.target.closest("form") && location.pathname === "/login") {
    e.preventDefault();

    const form = e.target;
    const username = form.querySelector("input[name='username']").value;
    const email = form.querySelector("input[name='email']").value;

    if (!username) {
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        username: username,
        email: email,
        bio: "",
      }),
    );

    store.isLoggedIn = true;
    navigateTo("/");
    render();
  }
});

const navigateTo = (path) => {
  window.history.replaceState({}, "", path);
};

const App = () => {
  if (location.pathname === "/login") {
    return LoginPage();
  }
  if (location.pathname === "/profile") {
    console.log("isLoggedIn", store.isLoggedIn);
    if (!store.isLoggedIn) {
      navigateTo("/login");

      return LoginPage();
    }

    return ProfilePage();
  }
  if (location.pathname === "/") {
    return MainPage();
  }

  return ErrorPage();
};

const render = () => {
  console.trace("render", store.isLoggedIn);
  document.body.innerHTML = App();
};

window.addEventListener("popstate", (e) => {
  e.preventDefault();
  render();
});

render();
