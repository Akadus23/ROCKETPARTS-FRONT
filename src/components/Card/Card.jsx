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
        <div >
            
                <div>
                <div className={style.container} key={id}>
                        <h3>{nombre}</h3>
                        <img className={style.imagenes} src={img} alt="" />
                        <h3>{precio}$</h3>
                        <h3> {calificacion} </h3>
                        
                        {dispo?<div>
                        {!carrito.find(elemento=>Number(id) === elemento.id)?
                        <button onClick={()=>añadir(all)}>Añadir a carrito</button>:
                        <button onClick={()=>quitar(Number(id))}>Quitar de carrito</button>}
                    </div>:null}
                        <Link   to={`/Detalle/${id}`}><button>ver más</button></Link>   
                    </div>
                    
                    
                </div>
            
        </div>
    )
}