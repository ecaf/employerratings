import React from "react";

const authData = {
  signedIn: false,
  user: null,
  isEmployer: false
};

export default React.createContext({authData: {...authData}, setAuthData: (val) => {}});