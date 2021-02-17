import { createContext } from 'react';

export const AppContext = createContext({
    money: {
        value: 0,
        currency: 'USD'
    },
    setMoney: () => null
});
