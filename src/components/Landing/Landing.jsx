import React from "react";
import { Link } from 'react-router-dom'

export default function Landing (){
    return(
        <div>
            <img src="" alt="" />
            <h1>Bienvenidos a Rocket-Parts</h1>
            <Link to='/Home'>
            <button>Iniciar</button>
            </Link>
        </div>
    )
}