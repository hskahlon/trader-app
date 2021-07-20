import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Stocks from "./pages/Stocks";
import Trade from "./pages/Trade";
import Profile from "./pages/Profile";
import About from "./pages/About";
import { useAuth, useAuthUpdate } from "./contexts/authContext";

const App = () => {
  const user = useAuth();
  const updateUser = useAuthUpdate();

  useEffect(() => {
    updateUser(JSON.parse(localStorage.getItem("profile")));
  }, [user]);

  return (
    <HashRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={!user ? Auth : Home} />
          <Route path="/index.html" exact component={!user ? Auth : Home} />
          <Route path="/home" exact component={!user ? Auth : Home} />
          <Route path="/stocks" exact component={!user ? Auth : Stocks} />
          <Route path="/trade" exact component={!user ? Auth : Trade} />
          <Route path="/profile" exact component={!user ? Auth : Profile} />
          <Route path="/about" exact component={!user ? Auth : About} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </HashRouter>
  );
};

export default App;
