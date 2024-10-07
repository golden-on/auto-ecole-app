import { BasketItem } from '../contexts/BasketContext';

type BasketAction =
    | { type: 'ADD_TO_BASKET'; item: BasketItem }
    | { type: 'REMOVE_FROM_BASKET'; id: number }
    | { type: 'CLEAR_BASKET' };

type BasketState = {
    basketItems: BasketItem[];
};

export const basketReducer = (state: BasketState, action: BasketAction): BasketState => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return { ...state, basketItems: [...state.basketItems, action.item] };
        case 'REMOVE_FROM_BASKET':
            return { ...state, basketItems: state.basketItems.filter(item => item.id !== action.id) };
        case 'CLEAR_BASKET':
            return { ...state, basketItems: [] };
        default:
            return state;
    }
};