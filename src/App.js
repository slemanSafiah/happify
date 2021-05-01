import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./routes/Main";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Search from "./routes/Search";
import Ranking from "./routes/Ranking";
import Factors from "./routes/Factors";
import NavBar from "./components/Navbar";
import { AuthProvider } from './context/Context'
import PrivateRoute from './routes/PrivateRoute'
function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <NavBar></NavBar>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/ranking" component={Ranking} />
            <PrivateRoute path="/search" component={Search} />
            <PrivateRoute path="/factors" component={Factors} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
