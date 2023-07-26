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
                        <li><a href="#">Work</a></li>
                        <li><a href="#">Mision</a></li>
                        <li><a href="#">Vision</a></li>
                    </ul>
                </nav>
                <Link to="/home" className="button"> <button>Home</button> </Link>
            </header>
            <main className="main-section">
                <section>
                    <img src="https://tm.ibxk.com.br/2021/12/22/22114306286189.jpg?ims=1200x675" alt="image" />
                </section>
            </main>
        </>
    )
}