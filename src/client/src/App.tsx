import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import ListDetails from './pages/ListDetails/ListDetails';
import ListEdit from './pages/ListEdit/ListEdit';
import ListItemEdit from './pages/ListItemEdit/ListItemEdit';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/lists/:id' component={ListDetails} />
        <Route exact path='/lists/edit/:id' component={ListEdit} />
        <Route
          exact
          path='/lists/:listId/edit/items/:itemId'
          component={ListItemEdit}
        />
        <Route exact path='/login' component={SignIn} />
        <Route exact path='/register' component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
