import Header from "./components/Header"
import Cake from "./components/Cake"
import { useCart } from "./hooks/useCart"

export default function App() {

  const { data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal } = useCart();


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
              {data.map( ( cake ) => (
                  <Cake 
                    key={cake.id}
                    cake={cake}
                    addToCart={addToCart}
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


