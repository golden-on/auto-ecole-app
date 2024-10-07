export interface UserState {
    isAuthenticated: boolean;
    email: string;
}

export type UserAction =
    | { type: 'LOGIN'; payload: string }
    | { type: 'LOGOUT' };

export const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                email: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                email: '',
            };
        default:
            return state;
    }
};