import store from "./store/store.js";
import LoginPage from "./pages/LoginPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import MainPage from "./pages/MainPage.js";
import ErrorPage from "./pages/ErrorPage.js";
import HashRouter from "./router/hashRouter.js";
import authMiddleWare from "./middlewares/authMiddleware.js";

document.body.addEventListener("click", (e) => {
  if (e.target.id === "logout" || e.target.closest("#logout")) {
    e.preventDefault();

    store.isLoggedIn = false;
    localStorage.removeItem("user");

    hashRouter.navigate({ to: "/login" });

    return;
  }

  const linkElement = e.target.closest("a");
  if (linkElement) {
    e.preventDefault();

    const pathname = linkElement.href.replace(location.origin, "");
    HashRouter.navigate(pathname);
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
      HashRouter.navigate("/");
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

      HashRouter.navigate("/profile");
    }
  }
});

const routes = [
  { path: "/", component: MainPage },
  { path: "/profile", component: ProfilePage, meta: { requiresAuth: true } },
  { path: "/login", component: LoginPage, meta: { guestOnly: true } },
  { path: "/*", component: ErrorPage },
];

const hashRouter = new HashRouter(routes);
hashRouter.use(authMiddleWare(store)).init();
