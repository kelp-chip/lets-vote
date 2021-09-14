import React, { useState } from "react";
import "regenerator-runtime/runtime";
import axios from "axios";
import "./style.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreatePoll from "./pages/CreatePoll.jsx";
import Dummy from "./pages/Dummy.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={CreatePoll} />
        <Route path="/dummy" exact component={Dummy} />
      </Switch>
    </Router>
  );
}

export default App;
