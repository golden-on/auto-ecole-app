import React, { createContext, useReducer, ReactNode } from 'react';
import { basketReducer } from '../reducer/basketReducer';

export type BasketItem = {
    id: number;
    type: string;
    name: string;
    brand: string;
    description: string;
    duration: number;
    price: number;
};

type BasketContextType = {
    basketItems: BasketItem[];
    addToBasket: (item: BasketItem) => void;
    removeFromBasket: (id: number) => void;
    clearBasket: () => void;
};

const initialBasketState = {
    basketItems: [],
};

export const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [basketState, basketDispatch] = useReducer(basketReducer, initialBasketState);

    const addToBasket = (item: BasketItem) => {
        basketDispatch({ type: 'ADD_TO_BASKET', item });
    };

    const removeFromBasket = (id: number) => {
        basketDispatch({ type: 'REMOVE_FROM_BASKET', id });
    };

    const clearBasket = () => {
        basketDispatch({ type: 'CLEAR_BASKET' });
    };

    return (
        <BasketContext.Provider value={{ 
            basketItems: basketState.basketItems, 
            addToBasket, 
            removeFromBasket, 
            clearBasket 
        }}>
            {children}
        </BasketContext.Provider>
    );
};