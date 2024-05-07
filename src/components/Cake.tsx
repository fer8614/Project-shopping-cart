import type { Cake } from "../types/index"
type GuitarProps = {
    cake: Cake,
    addToCart: ( item: Cake ) => void
}

export default function Cake( { cake, addToCart } : GuitarProps ) {

    const { name, image, description, price } = cake;

        

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                  <div className="col-4">
                      <img className="img-fluid" src={ `/img/${ image }.png` } alt="image cake" />
                  </div>
                  <div className="col-8">
                      <h3 className="text-black fs-4 fw-bold text-uppercase">{ name }</h3>
                      <p>{ description }</p>
                      <p className="fw-black text-primary fs-3">${ price }</p>
                      <button 
                          type="button"
                          className="btn btn-dark w-100"
                          onClick={ () => addToCart( cake )}
                      >Agregar al Carrito</button>
                  </div>
              </div>
    )
}
