type UserAction = 
    | { type: 'LOGIN'; user: string }
    | { type: 'LOGOUT' };

type UserState = {
    user: string | null;
};

export const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.user };
        case 'LOGOUT':
            return { ...state, user: null };
        default:
            return state;
    }
};