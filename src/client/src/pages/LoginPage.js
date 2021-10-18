import { useLocation } from 'react-router-dom';
import userAuth from '../auth/userAuth';

const userCredentials = {};

export default function LoginPage() {

    const location = useLocation();
    const { login } = userAuth();

    return (
        <div>
            <h1>LoginPage</h1>
            <button onClick={() => login(userCredentials, location.state?.from)}>Login</button> {/* null safe operator*/}
        </div>
    );
}
