import React, { useEffect, useState } from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";
import decode from "jwt-decode";

function Navbar({ user, setUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [tab, setTab] = React.useState(window.location.pathname);

  const handleChange = (event, value) => {
    setTab(value);
    history.push(`/${value}`);
  };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <>
      <AppBar position="static">
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Home" value="home" />
          <Tab label="Charts" value="stocks" />
          <Tab label="Trade" value="trade" />
          <Tab label="Profile" value="profile" />
          <Tab label="Research" value="research" />
          <Tab label="Logout" value="logout" onClick={logout} />
        </Tabs>
      </AppBar>
    </>
  );
}

export default Navbar;
