import React from "react";
import { Link } from "react-router-dom";



export default function Card({nombre, img, descuento, id, precio, calificacion}){
    return(
        <div >
            <Link   to={`/productos/${id}`}>
                <div>
                    <img src={img} alt="img not found"  width="150px" height="150px" />
                    <div>
                        <h2> {nombre} </h2>
                        <p>{precio} </p>
                        <p> {descuento} </p>
                        <p> {calificacion} </p>
                    </div>
                    
                </div>
            </Link>
        </div>
    )
}