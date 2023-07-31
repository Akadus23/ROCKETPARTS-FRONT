import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { buscarId, addCarrito,removeCarrito} from "../../redux/actions";
import {Link} from 'react-router-dom'
export default function Detail() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const detail = useSelector(state=>state.detail)
    const carrito = useSelector(state=>state.carritoCompra)
    const añadir =(ele)=>{
        return dispatch(addCarrito(ele))
    }
    const quitar = (id) =>{
        return dispatch(removeCarrito(id))
    }
    useEffect(()=>{
        dispatch(buscarId(id))
    },[])
    return(
        <div>
            {detail?
                <div>
                    <h2>{detail.nombreproducto}</h2>
                    <img src={detail.fotoprinc} alt="" />
                    <h3>Precio estandar{detail.precioproducto}$</h3>
                    <h3>Categoria: {detail.categoria}</h3>
                    <h2>Descripción</h2>
                    <h4>-{detail.descproducto}</h4>
                    <Link to='/Tienda'><button>volver</button></Link>
                    {detail.disponibproducto?<div>
                        {!carrito.find(elemento=>Number(detail.id) === elemento.id)?
                        <button onClick={()=>añadir(detail)}>Añadir a carrito</button>:
                        <button onClick={()=>quitar(Number(detail.id))}>Quitar de carrito</button>}
                    </div>:null}
                </div>
            :null}
        </div>
    )
}