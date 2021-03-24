import React from "react";

const defaultValues = {
  loggedIn: false,
  userToken: null,
  setUserToken: () => {},
};

export const AuthContext = React.createContext(defaultValues);
