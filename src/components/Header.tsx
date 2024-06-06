import { useMemo, Dispatch } from 'react';
import type { CartItem } from '../types/index';
import type { CartActions } from '../reducers/cart-reducer';

type HeaderProps = {
    cart: CartItem[],
    dispatch: Dispatch<CartActions>,
}
export default function Header( { cart, dispatch } : HeaderProps ) {

      //state derivado
      const isEmpty = useMemo( () => cart.length === 0, [ cart ] );
      const cartTotal = useMemo( () => cart.reduce( ( total, item ) => total + (item.quantity * item.price), 0 ), [ cart ] );
  
    return(
            <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/logo-anitaCake.png" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">

                            { isEmpty ? (
                                <p className="text-center">The cart is empty</p>
                                
                            ) : (
                            <>    
                                <table className="w-100 table">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { cart.map( cake => (
                                            <tr key={ cake.id }>
                                                <td>
                                                    <img className="img-fluid" src={`/img/${ cake.image }.png`} alt="cake image" />
                                                </td>
                                                <td>{ cake.name }</td>
                                                <td className="fw-bold">
                                                    ${ cake.price }
                                                </td>
                                                <td className="flex align-items-start gap-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={ () => dispatch({ type: 'DECREASE_QUANTITY', payload: { id: cake.id } }) }
                                                    >
                                                        -
                                                    </button>
                                                    { cake.quantity }
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={ () => dispatch({ type: 'INCREASE_QUANTITY', payload: { id: cake.id } }) }
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        type="button"
                                                        onClick={ () => dispatch({ type: 'REMOVE_FROM_CART', payload: { id: cake.id } }) }
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            
                                <p className="text-end">Total to pay: <span className="fw-bold">${ cartTotal }</span></p>
                            </>
                            )}
                            <button className="btn btn-dark w-100 mt-3 p-2" onClick={ () => { dispatch({ type: 'CLEAR_CART' }) }  }>Empty cart</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    )
}
