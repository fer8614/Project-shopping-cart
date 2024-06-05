import { useEffect, useState, useMemo } from "react"
import type { Cake, CartItem } from "../types/index"

export const useCart = () => {
    
    const inititalCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem( 'cart' );
        return localStorageCart ? JSON.parse( localStorageCart ) : [];
      }
    
      const [ cart, setCart ] = useState( inititalCart );
    
      const max_items = 5;
      const min_items = 1;
    
      useEffect( () => {
        localStorage.setItem( 'cart', JSON.stringify( cart ) )
      }, [ cart ] )
    
      function removeFromCart( id : Cake['id'] ) {
        setCart( prevCart => prevCart.filter( item => item.id !== id ) )
      }
    
      function increaseQuantity( id : Cake['id'] ) {
        const updateCart = cart.map( item => {
          if ( item.id === id && item.quantity < max_items ) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })
        setCart( updateCart )
        console.log('agregado', id);
      }
    
     function decreaseQuantity( id : Cake['id'] ) {
        const updateCart = cart.map( item => {
          if ( item.id === id && item.quantity > min_items ) {
            return {
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item
        })
        setCart( updateCart )
        console.log('Eliminado', id);
      }
    
      function clearCart() {
        setCart( [] )
      }

      //state derivado
    const isEmpty = useMemo( () => cart.length === 0, [ cart ] );
    const cartTotal = useMemo( () => cart.reduce( ( total, item ) => total + (item.quantity * item.price), 0 ), [ cart ] );

    return { 
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal,
    }
}

