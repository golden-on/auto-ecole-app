import React, { createContext, useReducer, ReactNode } from 'react';

interface UserState {
    isAuthenticated: boolean;
    user: string | null;
}

interface UserContextProps {
    state: UserState;
    user: string | null;
    login: (user: string) => void;
    logout: () => void;
}

const initialState: UserState = { isAuthenticated: false, user: null };

const userReducer = (state: UserState, action: { type: string; payload?: string }): UserState => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isAuthenticated: true, user: action.payload || null };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false, user: null };
        default:
            return state;
    }
};

export const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const login = (user: string) => {
        dispatch({ type: 'LOGIN', payload: user });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <UserContext.Provider value={{ state, user: state.user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;