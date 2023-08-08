import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css"
import { addCarrito,removeCarrito } from "../../redux/actions";
import { useDispatch,useSelector } from "react-redux";



export default function Card({nombre, img, descuento, id, precio, calificacion,dispo,all}){
    const dispatch = useDispatch()
    const carrito = useSelector(state=>state.carritoCompra)
    const añadir =(ele)=>{
        return dispatch(addCarrito(ele))
    }
    const quitar = (id) =>{
        return dispatch(removeCarrito(id))
    }
    return(
        <div className={style.allcontainer} >
                <div className={style.container} key={id}>
                        <h3>{nombre}</h3>
                        <img className={style.imagenes} src={img} alt="" />
                        <h3>{precio}$</h3>
                        {dispo?<h3>Disponible</h3>:<h3>No disponible</h3>}
                        {dispo?<div>
                        {!carrito.find(elemento=>Number(id) === elemento.id)?
                        <button className={style.botones} onClick={()=>añadir(all)}>Añadir a carrito</button>:
                        <button className={style.botonQuitar} onClick={()=>quitar(Number(id))}>Quitar de carrito</button>}
                    </div>:null}
                        <Link   to={`/Detalle/${id}`}><button className={style.botones}>ver más</button></Link>   
                    </div>
        </div>
    )
}