import React, { useState } from "react";
import "regenerator-runtime/runtime";
import axios from "axios";
import "./style.scss";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import CreatePoll from "./pages/CreatePoll/index.jsx";
import Poll from "./pages/Poll.jsx";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/poll" exact component={CreatePoll} />
        <Route path="/poll/:id" component={Poll} />
      </Switch>
    </main>
  );
}

export default App;
