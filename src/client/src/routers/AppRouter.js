import { Router, Route, Switch } from 'react-router-dom';
import Navigation from '../components/Navigation';
import routes from '../helpers/routes';
import AccountPage from '../pages/AccountPage';
import FavoriteItemPage from '../pages/Favorites/Favorite/FavoriteItemPage';
import FavoritesPage from '../pages/Favorites/FavoritesPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export default function AppRouter() {
    return (
        <Switch>
            <PublicRoute exact path={routes.home} component={HomePage} />
            <PublicRoute exact path={routes.login} component={LoginPage} />
            <PublicRoute exact path={routes.register} component={RegisterPage} />
            <PrivateRoute exact path={routes.account} component={AccountPage} />
            <PrivateRoute exact path={routes.favorites} component={FavoritesPage} />
            <PrivateRoute exact path={routes.favoriteItem()} component={FavoriteItemPage} />

            <Route exact path='*' component={NotFoundPage}></Route>

        </Switch>
    )
}
