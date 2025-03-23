import store from "../store/store.js";
import { createRouter, useRouter } from "./router/routes.js";

document.body.addEventListener("click", (e) => {
  if (e.target.id === "logout" || e.target.closest("#logout")) {
    e.preventDefault();

    store.isLoggedIn = false;
    localStorage.removeItem("user");

    useRouter().navigate({ to: "/login" });

    return;
  }

  const linkElement = e.target.closest("a");
  if (linkElement) {
    e.preventDefault();

    const pathname = linkElement.href.replace(location.origin, "");
    useRouter().navigate({ to: pathname });
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
      useRouter().navigate({ to: "/" });
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

      useRouter().navigate({ to: "/profile" });
    }
  }
});

createRouter({ type: "hash" });
