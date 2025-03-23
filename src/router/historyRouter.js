import Router from "./router.js";

class HistoryRouter extends Router {
  init() {
    window.addEventListener("popstate", () => {
      this.navigate({ to: window.location.pathname });
    });

    this.navigate({ to: window.location.pathname });
  }

  push(path) {
    window.history.pushState({}, "", path);
  }

  replace(path) {
    window.history.replaceState({}, "", path);
  }
}

export default HistoryRouter;
