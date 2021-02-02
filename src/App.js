import logo from "./logo.svg";
import "./App.css";
import SignIn from "./components/signIn.js";
import SignUp from "./components/signUp.js";
import Home from "./components/home.js";
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";

import Profile from "./components/profile.js";
import Transactions from "./components/transactions.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/home" component={Home} />
          <Route path="/home/transactions" component={Transactions} />
          <Route path="/home/profile" component={Profile} />
          <Redirect to="/signin" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
