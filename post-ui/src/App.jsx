import "./App.css";
import { Route, Switch } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./pages/Profile.jsx";
import Signup from "./pages/Signup.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route strict exact path="/" component={Signup} />
        <Route strict exact path="/signup" component={Signup} />
        <Route strict exact path="/profile/:id" component={Profile} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
