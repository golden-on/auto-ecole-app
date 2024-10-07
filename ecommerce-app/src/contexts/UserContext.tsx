import React, { createContext, useReducer, ReactNode } from 'react';
import { userReducer } from '../reducer/userReducer'

type UserContextType = {
    user: string | null;
    login: (user: string) => void;
    logout: () => void;
};

const initialUserState = {
    user: null,
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userState, userDispatch] = useReducer(userReducer, initialUserState);

    const login = (user: string) => {
        userDispatch({ type: 'LOGIN', user });
    };

    const logout = () => {
        userDispatch({ type: 'LOGOUT' });
    };

    return (
        <UserContext.Provider value={{ 
            user: userState.user, 
            login, 
            logout 
        }}>
            {children}
        </UserContext.Provider>
    );
};