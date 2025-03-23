const Router = (function () {
  const routes = {};

  function addRoute(path, component) {
    routes[path] = component;
  }

  function navigate(path) {
    const component = routes[path] ?? routes["/*"];
    document.getElementById("root").innerHTML = component();

    return component();
  }

  function redirect(path) {
    window.history.replaceState({}, "", path);
    return navigate(path);
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
