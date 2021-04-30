import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./routes/Main";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Search from "./routes/Search";
import Ranking from "./routes/Ranking";
import Factors from "./routes/Factors";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div>
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/search" component={Search} />
          <Route path="/factors" component={Factors} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
