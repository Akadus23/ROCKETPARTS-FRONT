import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { buscarId, addCarrito,removeCarrito} from "../../redux/actions";
import {Link} from 'react-router-dom'
import style from './Detail.module.css'
import { useAuth0 } from "@auth0/auth0-react";
export default function Detail() {

    const { isAuthenticated } = useAuth0();

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
        <div >
            {detail?
                <div className={style.container}>
                    <h2>{detail.nombreproducto}</h2>
                    <img className={style.imagen} src={detail.fotoprinc} alt="" />
                    <h3>Precio estandar{detail.precioproducto}$</h3>
                    <h3>Categoria: {detail.categoria}</h3>
                    <h2>Descripción</h2>
                    <h4>{detail.descproducto}</h4>
                    {detail.disponibproducto?<h3>Disponible</h3>:<h3>No Disponible</h3>}
                    {detail.disponibproducto?<div>
                        {!carrito.find(elemento=>Number(detail.id) === Number(elemento.id))?
                        <button className={style.botones} onClick={()=>añadir(detail)}>Añadir a carrito</button>:
                        <button className={style.botonQuitar} onClick={()=>quitar(Number(detail.id))}>Quitar de carrito</button>}
                    </div>:null}
                    { isAuthenticated ? <Link to={`/Editar/${detail.id}`} ><button className={style.botones}>Editar</button></Link> : null }
                    
                    <Link to='/Tienda'><button className={style.botones}>Volver a Tienda</button></Link>
                </div>
            :null}
        </div>
    )
}