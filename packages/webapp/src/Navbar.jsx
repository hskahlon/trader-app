import React from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import About from "./About";
import Home from "./Home";
import Stocks from "./Stocks";
import Trade from "./Trade";
import Profile from "./Profile";

function Navbar() {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Home" />
          <Tab label="Stocks" />
          <Tab label="Trade" />
          <Tab label="Profile" />
          <Tab label="About" />
        </Tabs>
      </AppBar>

      {tab === 0 && <Home />}
      {tab === 1 && <Stocks />}
      {tab === 2 && <Trade />}
      {tab === 3 && <Profile />}
      {tab === 4 && <About />}
    </>
  );
}

export default Navbar;
