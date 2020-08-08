import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="*">404</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
