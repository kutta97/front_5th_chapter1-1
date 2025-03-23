import Renderer from "../utils/renderer.js";

const Router = (function () {
  const routes = {};

  function addRoute(path, component) {
    routes[path] = component;
  }

  function render(path) {
    const component = (routes[path] ?? routes["/*"])();
    Renderer.render({ component });

    return component;
  }

  function navigate(path) {
    window.history.pushState({}, "", path);

    return render(path);
  }

  function redirect(path) {
    window.history.replaceState({}, "", path);

    return render(path);
  }

  function init() {
    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      navigate(window.location.pathname);
    });

    navigate(window.location.pathname);
  }

  return {
    addRoute,
    navigate,
    redirect,
    init,
  };
})();

export default Router;
