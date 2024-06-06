import { useEffect, useState } from "react";
import type { CartItem } from "../types/index";

export const useCart = () => {
    
    const inititalCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem( 'cart' );
        return localStorageCart ? JSON.parse( localStorageCart ) : [];
      }
    
      const [ cart, setCart ] = useState( inititalCart );
    
      useEffect( () => {
        localStorage.setItem( 'cart', JSON.stringify( cart ) )
      }, [ cart ] )

    return { 
        cart,
    }
}

