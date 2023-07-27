import React from "react";
import { Link } from 'react-router-dom'
import "./Landing.css"

export default function Landing (){
    return(
        <>
            <header className="main-container">
                <div className="logo">
                    <img src="https://i.ibb.co/R0XHpNw/Rocket-Parts-Small.png" alt="Logo"/>
                </div>
                <nav className="navBar">
                    <ul className="list">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Mision</a></li>
                        <li><a href="#">Vision</a></li>
                        <li><a href="#">Novedades</a></li>
                    </ul>
                </nav>
                <Link to="/" className="button"> <button>Registrate</button> </Link>
            </header>
            <main className="main-section">
                    <img src="https://tm.ibxk.com.br/2021/12/22/22114306286189.jpg?ims=1200x675" alt="image" />
                    <h1>Tu mejor experiencia tecnológica!!!</h1>
                    <div className="link" >
                       <Link to="/home" className="link"> <h2>Ingresa ya</h2> </Link>
                    </div>
            </main>
        </>
    )
}
                 
                
            