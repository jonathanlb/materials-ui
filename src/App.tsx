import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Browse } from "./components/Browse";
import { Home } from "./components/Home";
import { Login } from "./components/Login";

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
