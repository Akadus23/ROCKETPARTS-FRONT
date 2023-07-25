import React from "react";
import { Link } from 'react-router-dom'
import Navbar from "../../components/Navbar/Navbar";

export default function Landing (){
    return(
        <div class="w-full h-screen">
            
            <Navbar />
            
            <img src="" alt="" />
            <h1>Bienvenidos a Rocket-Parts</h1>
            <Link to='/Home'>
            <button>Iniciar</button>
            </Link>
        </div>
    )
}