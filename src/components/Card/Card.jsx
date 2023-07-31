import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css"



export default function Card({nombre, img, descuento, id, precio, calificacion}){
    return(
        <div >
            <Link   to={`/productos/${id}`}>
                <div>
                <div className={style.container} key={id}>
                        <h3>{nombre}</h3>
                        <img className={style.imagenes} src={img} alt="" />
                        <h3>{precio}$</h3>
                        <h3> {calificacion} </h3>
                    </div>
                    
                </div>
            </Link>
        </div>
    )
}