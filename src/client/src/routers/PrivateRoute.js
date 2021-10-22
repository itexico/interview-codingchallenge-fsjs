import { Redirect, Route, useLocation } from 'react-router-dom';
import userAuth from '../auth/userAuth';
import routes from '../helpers/routes';

export default function PrivateRoute({ ...rest }) {
    const { isLogged } = userAuth();
    const location = useLocation();

    if (!isLogged()) return <Redirect to={{ pathname: routes.home, state: { from: location } }} />;

    return <Route {...rest} />;
}
