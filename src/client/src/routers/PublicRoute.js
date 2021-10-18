import { Redirect, Route } from 'react-router-dom';
import userAuth from '../auth/userAuth';
import routes from '../helpers/routes';

export default function PublicRoute(props) {
    const { isLogged } = userAuth();

    if (isLogged()) return <Redirect to={routes.favorites} />;

    return <Route {...props} />;
}
