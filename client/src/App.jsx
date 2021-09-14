import React, { useState } from "react";
import "regenerator-runtime/runtime";
import axios from "axios";
import "./style.scss";
import { Switch, Route } from "react-router-dom";
import CreatePoll from "./pages/CreatePoll.jsx";
import Poll from "./pages/Poll.jsx";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={CreatePoll} />
      <Route path="/poll/:id" component={Poll} />
    </Switch>
  );
}

export default App;
