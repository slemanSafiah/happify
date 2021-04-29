import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Main from './components/Main'
import Login from './components/Login'
import Register from './components/Register'
import Search from './components/Search'
import Ranking from './components/Ranking'
import Factors from './components/Factors'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact component={Main} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/ranking' component={Ranking} />
          <Route path='/search' component={Search} />
          <Route path='/factors' component={Factors} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
