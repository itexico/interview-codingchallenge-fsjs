import { Redirect, Route, useLocation } from 'react-router-dom';
import userAuth from '../auth/userAuth';
import routes from '../helpers/routes';

export default function PrivateRoute({ ...rest }) {
    const location = useLocation();
    // console.log(location);
    const { isLogged } = userAuth();

    if (!isLogged()) return <Redirect to={{ pathname: routes.login, state: { from: location } }} />;

    return <Route {...rest} />;
}
