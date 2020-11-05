import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import { Browse } from "./Browse";
import { Home } from "./Home";
import { Login } from "./Login";

import "./App.css";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/browse/:materialID" component={Browse} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
