
import { db } from "../data/db"
import { Cake, CartItem } from "../types/index"
export type CartActions = 
    { type: 'ADD_TO_CART', payload: { item: Cake } } |
    { type: 'REMOVE_FROM_CART', payload: { id : Cake['id'] } } |
    { type: 'INCREASE_QUANTITY', payload: { id : Cake['id'] } } |
    { type: 'DECREASE_QUANTITY', payload: { id : Cake['id'] } } |
    { type: 'CLEAR_CART' }
    
export type CartState = {
    data: Cake[]
    cart: CartItem[]
}

export const inititalState : CartState = {
    data: db,
    cart: []
}

const max_items = 5;
const min_items = 1;

export const cartReducer = ( 
        state: CartState = inititalState, 
        action: CartActions 
    ) => { 
    
    if ( action.type === 'ADD_TO_CART' ) {
        console.log('From add to cart');

        const ItemExistIndex = state.cart.find(searchItem => searchItem.id === action.payload.item.id);

            let updatedCart: CartItem[] = [];
            if (ItemExistIndex) {
                updatedCart = state.cart.map( item => {
                    if ( item.id === action.payload.item.id ) { 
                        if( item.quantity < max_items ) {
                            return {
                                ...item,
                                quantity: item.quantity + 1
                            }
                        } else {
                            return item
                        }
                    } else {
                        return item
                    }
                })
            } else {
              const newItem : CartItem = {
                ...action.payload.item,  
                quantity : 1,
              }
              updatedCart = [...state.cart, newItem];
            }
             
        return {
            ...state,
            cart: updatedCart
        }
    }

    if ( action.type === 'REMOVE_FROM_CART' ) {
        const cart = state.cart.filter( item => item.id !== action.payload.id )
        return{
            ...state,
            cart
        } 

    }

    if ( action.type === 'INCREASE_QUANTITY' ) {
        const cart = state.cart.map( item => {
            if ( item.id === action.payload.id && item.quantity < max_items ) {
              return {
                ...item,
                quantity: item.quantity + 1
              }
            }
            return item
          })
        return {
            ...state,
            cart
        }
    }

    if ( action.type === 'DECREASE_QUANTITY' ) {
        const updateCart = state.cart.map( item => {
            if ( item.id === action.payload.id && item.quantity > min_items ) {
              return {
                ...item,
                quantity: item.quantity - 1
              }
            }
            return item
          })
        return {
            ...state,
            cart: updateCart
        }
    }

    if ( action.type === 'CLEAR_CART' ) {
        
        return {
            ...state,
            cart: []
        }
    }

    return state
}