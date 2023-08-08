import style from './Results.module.css'
import { useDispatch, useSelector} from 'react-redux'
import { addCarrito, removeCarrito} from '../../redux/actions';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
        <div className={style.allcontainer}>
            {ver?.map(ele=>{
                return(
                    <div className={style.container} key={ele.id}>
                        <h3>{ele.nombreproducto}</h3>
                        <img className={style.imagenes} src={ele.fotoprinc} alt="" />
                        <h3>{ele.precioproducto}$</h3>
                        {ele.disponibproducto?<h3>Disponible</h3>:<h3>No disponible</h3>}
                        {ele.disponibproducto?<div>
                           {!ayuCarrito.find(elemento=>ele.id === elemento.id)?
                            <button className={style.botones} onClick={()=>añadir(ele)}>Añadir a carrito</button>:
                            <button className={style.botonQuitar} onClick={()=>quitar(ele.id)}>Quitar de carrito</button>} 
                        </div>:null}
                        <Link to={`/Detalle/${ele.id}`}><button className={style.botones}>ver más</button></Link>
                    </div>
                )
            })}
        </div>
    )
}