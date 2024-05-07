import { useEffect, useState, useMemo } from "react"
import { db } from "../data/db";
import type { Cake, CartItem } from "../types/index"

export const useCart = () => {
    
    const inititalCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem( 'cart' );
        return localStorageCart ? JSON.parse( localStorageCart ) : [];
      }
    
      const [ data ] = useState( db );
      const [ cart, setCart ] = useState( inititalCart );
    
      const max_items = 5;
      const min_items = 1;
    
      useEffect( () => {
        localStorage.setItem( 'cart', JSON.stringify( cart ) )
      }, [ cart ] )
      function addToCart( item: Cake ) {
    
        const ItemExistIndex = cart.findIndex(searchItem => searchItem.id === item.id);
          if (ItemExistIndex >= 0) {
            if( cart[ItemExistIndex].quantity >= max_items ) return
              const updatedCart = [...cart];
                updatedCart[ItemExistIndex].quantity++;
                setCart(updatedCart);
            } else {
              const newItem : CartItem = {
                ...item,  
                quantity : 1,
              }
             
              setCart( [...cart, newItem] );
        }
      }
    
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
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal,
    }
}

