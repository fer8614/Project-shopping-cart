import type { CartItem, Cake } from '../types/index'

type HeaderProps = {
    cart: CartItem[],
    removeFromCart: ( id : Cake['id'] ) => void,
    increaseQuantity: ( id : Cake['id'] ) => void,
    decreaseQuantity: ( id : Cake['id'] ) => void,
    clearCart: () => void,
    isEmpty: boolean,
    cartTotal: number
}
export default function Header( { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal } : HeaderProps ) {

    
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
                                <p className="text-center">El carrito esta vacio</p>
                                
                            ) : (
                            <>    
                                <table className="w-100 table">
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
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
                                                        onClick={ () => decreaseQuantity( cake.id ) }
                                                    >
                                                        -
                                                    </button>
                                                    { cake.quantity }
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={ () => increaseQuantity( cake.id ) }
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        type="button"
                                                        onClick={ () => removeFromCart( cake.id ) }
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            
                                <p className="text-end">Total pagar: <span className="fw-bold">${ cartTotal }</span></p>
                            </>
                            )}
                            <button className="btn btn-dark w-100 mt-3 p-2" onClick={ clearCart }>Vaciar Carrito</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    )
}
