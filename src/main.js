import store from "./store/store.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import MainPage from "./pages/MainPage.js";
import ErrorPage from "./pages/ErrorPage.js";
import HistoryRouter from "./router/historyRouter.js";

document.body.addEventListener("click", (e) => {
  if (e.target.id === "logout" || e.target.closest("#logout")) {
    e.preventDefault();

    store.isLoggedIn = false;
    localStorage.removeItem("user");

    return;
  }

  const linkElement = e.target.closest("a");
  if (linkElement) {
    e.preventDefault();

    const pathname = linkElement.href.replace(location.origin, "");
    HistoryRouter.navigate(pathname);
  }
});

document.body.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.closest("form")) {
    if (location.pathname === "/login") {
      const form = e.target;
      const username = form.querySelector("input[name='username']").value;
      const email = form.querySelector("input[name='email']").value;

      if (!username) {
        return;
      }

      store.user = {
        username: username,
        email: email,
        bio: "",
      };

      localStorage.setItem("user", JSON.stringify(store.user));

      store.isLoggedIn = true;
      HistoryRouter.navigate("/");
    }

    if (location.pathname === "/profile") {
      const form = e.target;
      const username = form.querySelector("#username").value;
      const email = form.querySelector("#email").value;
      const bio = form.querySelector("#bio").value;

      console.log(form, username, email, bio);

      store.user = {
        username: username,
        email: email,
        bio: bio,
      };

      localStorage.setItem("user", JSON.stringify(store.user));

      HistoryRouter.navigate("/profile");
    }
  }
});

HistoryRouter.addRoute("/", MainPage);
HistoryRouter.addRoute("/profile", () => {
  if (!store.isLoggedIn) {
    return HistoryRouter.redirect("/login");
  }

  return ProfilePage({ user: store.user });
});
HistoryRouter.addRoute("/login", () => {
  if (store.isLoggedIn) {
    return HistoryRouter.redirect("/");
  }

  return LoginPage();
});
HistoryRouter.addRoute("/*", ErrorPage);
HistoryRouter.init();
