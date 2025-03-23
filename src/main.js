import store from "./store/store.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import MainPage from "./pages/MainPage.js";
import ErrorPage from "./pages/ErrorPage.js";
import Router from "./router/router.js";

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
    Router.navigate(pathname);
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

    store.user = {
      username: username,
      email: email,
      bio: "",
    };

    localStorage.setItem("user", JSON.stringify(store.user));

    store.isLoggedIn = true;
    Router.navigate("/");
  }
});

Router.addRoute("/", MainPage);
Router.addRoute("/profile", () => {
  if (!store.isLoggedIn) {
    return Router.redirect("/login");
  }

  return ProfilePage({ user: store.user });
});
Router.addRoute("/login", LoginPage);
Router.addRoute("/*", ErrorPage);
Router.init();
