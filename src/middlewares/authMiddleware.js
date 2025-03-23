const authMiddleware = (store) => {
  return function (context) {
    const { meta } = context;

    if (meta?.requiresAuth && !store.isLoggedIn()) {
      context.redirect = "/login";
      return false;
    }

    if (meta?.guestOnly && store.isLoggedIn()) {
      context.redirect = "/";
      return false;
    }

    return true;
  };
};

export default authMiddleware;
