import { createContext, useEffect, useState } from "react";


export const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    
    useEffect(()=>{
        let existingcartItem=localStorage.getItem("cart")
        if(existingcartItem){
            setCart(JSON.parse(existingcartItem))
        }
    },[])
    

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider }
