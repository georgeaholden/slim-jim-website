import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './Components/HomePage/HomePage.js' ;
import Navibar from './Components/Navbar';
import NoMatch from "./Components/NoMatch";
import Register from './Components/Register/Register';
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile.js";


export default function App() {
  return (
      <Router>
        <Navibar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="/profile/:id" component={Profile} />
          <Route component={NoMatch} />
        </Switch>
    </Router>
  );
}