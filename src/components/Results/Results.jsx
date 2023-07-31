import style from './Results.module.css'
import { useDispatch, useSelector} from 'react-redux'
import { addCarrito, removeCarrito} from '../../redux/actions';
import { useState } from 'react';

export default function Results ({ver}){
    const dispatch = useDispatch();
    const ayuCarrito = useSelector(state=>state.carritoCompra)

    const añadir =(ele)=>{
        return dispatch(addCarrito(ele))
    }
    const quitar = (id) =>{
        return dispatch(removeCarrito(id))
    }

    return(
        <div>
            {ver?.map(ele=>{
                return(
                    <div className={style.container} key={ele.id}>
                        <h3>{ele.nombreproducto}</h3>
                        <img className={style.imagenes} src={ele.fotoprinc} alt="" />
                        <h3>{ele.precioproducto}$</h3>
                        {ele.disponibproducto?<h3>Disponible</h3>:<h3>No disponible</h3>}
                        {ele.disponibproducto?<div>
                           {!ayuCarrito.find(elemento=>ele.id === elemento.id)?
                            <button onClick={()=>añadir(ele)}>Añadir a carrito</button>:
                            <button onClick={()=>quitar(ele.id)}>Quitar de carrito</button>} 
                        </div>:null}
                    </div>
                )
            })}
        </div>
    )
}