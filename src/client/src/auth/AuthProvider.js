import { useState, useEffect } from 'react';

import { createContext } from 'react';
import { useHistory } from 'react-router-dom';
import roles from '../helpers/roles';
import routes from '../helpers/routes';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    useEffect(() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [])

    const login = (userCredentials, fromLocation) => {
        console.log("login: ", userCredentials);
        setUser({ userCredentials })
        if (fromLocation) {
            history.push(fromLocation);
        }

    };

    const logout = () => {
        setUser(null);
    };

    const isLogged = () => !!user;

    const contextValue = {
        user,
        isLogged,
        login,
        logout
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}