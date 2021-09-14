import React, { useState } from "react";
import "regenerator-runtime/runtime";
import axios from "axios";
import style from "./style.scss";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import CreatePoll from "./pages/CreatePoll/index.jsx";
import Poll from "./pages/Poll/index.jsx";

function App() {
  return (
    <main>
      <Link to="/" className={style.logo}>
        <h1>Let's Vote!</h1>
      </Link>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/poll" exact component={CreatePoll} />
        <Route path="/poll/:id" component={Poll} />
      </Switch>
    </main>
  );
}

export default App;
