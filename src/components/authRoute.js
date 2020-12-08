import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../UserContext";

const AuthRoute = props => {
  const {loggedIn} = useContext(UserContext)
  // const { isLoggedIn } = props;

  if (!loggedIn) return <Redirect to="/login" />

  return <Route {...props} />
  
};

export default AuthRoute