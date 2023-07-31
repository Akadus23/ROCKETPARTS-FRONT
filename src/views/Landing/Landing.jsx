import React from "react";
import { Link } from 'react-router-dom'
import Navbar from "../../components/Navbar/Navbar";

export default function Landing (){
    return(
        <div class="flex w-full h-screen bg-gray-300">
            <div class='w-1/2 h-72 items-center content-center '>
                <img href='https://res.cloudinary.com/dvlusccyu/image/upload/v1690749228/img_qatxpx.png' alt='Imagen no cargada' ></img>
            </div>
            <div>
                <p>Sueña</p>
            </div>
        </div>
    )
}