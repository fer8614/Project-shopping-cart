
import { db } from "../data/db"
import { Cake, CartItem } from "../types/index"
export type CartActions = 
    { type: 'ADD_TO_CART', payload: { cake: Cake, quantity: number } } |
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

export const cartReducer = ( 
        state: CartState = inititalState, 
        action: CartActions 
    ) => { 
    
    if ( action.type === 'ADD_TO_CART' ) {

        return {
            ...state,
        }
    }

    if ( action.type === 'REMOVE_FROM_CART' ) {
       
        return{
            ...state} 

    }

    if ( action.type === 'INCREASE_QUANTITY' ) {
        
        return {
            ...state
        }
    }

    if ( action.type === 'DECREASE_QUANTITY' ) {
        
        return {
            ...state
        }
    }

    if ( action.type === 'CLEAR_CART' ) {
        
        return {
            ...state
        }
    }

    return state
}