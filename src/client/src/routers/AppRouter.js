import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from '../components/Navigation';
import AccountPage from '../pages/AccountPage';
import FavoriteItemPage from '../pages/FavoriteItemPage';
import FavoritesPage from '../pages/FavoritesPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';

export default function AppRouter() {
    return (
        <Router>
            <Navigation />
            <Switch>
                <Route exact path='/' component={HomePage}></Route>
                <Route exact path='/login' component={LoginPage}></Route>
                <Route exact path='/register' component={RegisterPage}></Route>
                <Route exact path='/account' component={AccountPage}></Route>
                <Route exact path='/favorites' component={FavoritesPage}></Route>
                <Route exact path='/favorite/favoriteId' component={FavoriteItemPage}></Route>
                {/* <Route exact path='/login' component={log}></Route> */}

                <Route exact path='*' component={NotFoundPage}></Route>

            </Switch>
        </Router>
    )
}
