import React, { useState } from 'react';
import { CartContext } from './CartContext';

const CartContextProvider = ({ children }) => {
    const [selectedQty, setSelectedQty] = useState({});


    return (
        <CartContext.Provider value={{
            selectedQty, setSelectedQty,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
