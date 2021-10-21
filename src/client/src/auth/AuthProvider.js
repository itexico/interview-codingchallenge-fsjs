import { useState } from 'react';

import { createContext } from 'react';
import { useHistory } from 'react-router-dom';
import roles from '../helpers/roles';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const history = useHistory();
    const [user, setUser] = useState(null);

    const login = (userCredentials, fromLocation) => {
        setUser({ id: 1, name: 'aby', email: 'abimael1992g@gmail.com', role: roles.regular });
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