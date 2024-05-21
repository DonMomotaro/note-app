const ROUTES = {
  AUTH: "/auth",
  USER: "/users",
  NOTE: "/notes",
};

export const END_POINT = {
  AUTH: {
    SIGN_UP: `${ROUTES.AUTH}/sign-up`,
    LOGIN: `${ROUTES.AUTH}/login`,
  },
  USER: {
    PROFILE: `${ROUTES.USER}/profile`,
  },
};
