import { useReducer } from "react";
import Header from "./components/Header"
import Cake from "./components/Cake"
import { useCart } from "./hooks/useCart"
import { cartReducer, inititalState } from "./reducers/cart-reducer";

export default function App() {

  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal } = useCart();
  
  const [ state, dispatch ] = useReducer( cartReducer, inititalState)

  return (
    <>
     <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}
      isEmpty={isEmpty}
      cartTotal={cartTotal}
     />

      <main className="container-xl mt-5">
          <h2 className="text-center">Our products</h2>

          <div className="row mt-5">
              {state.data.map( ( cake ) => (
                  <Cake 
                    key={cake.id}
                    cake={cake}
                    dispatch={dispatch}
                  />
              ))}
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">Ana Cake - All rights reserved</p>
          </div>
      </footer>

    </>
  )
}


