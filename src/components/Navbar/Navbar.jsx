import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom'

export default function Navbar (){

  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  

    return (
        <div class="mb-10 h-10">
          <header class="w-full h-16 bg-black fixed">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 ml-5 mt-3 content-center">
                <Link to="/">
                <button>
                  <p class="no-underline text-violet-800 font-semibold text-2xl">
                    Rocket
                    <span class='text-zinc-100'>Parts</span>
                    </p>
                  
                </button>
                </Link>
              </div>
              <div class="flex items-center gap-8 mr-5 mt-3">
                <div  class="items-center font-semibold text-xl flex gap-6" >
                  <Link to='/Carrito'><button class="relative text-zinc-100 hover:after:bg-zinc-100 hover:after:w-full hover:after:h-[0.7px] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:content:'' transition-all" >🛒</button></Link>
                  <Link to="/Tienda" > <button class="relative text-zinc-100 hover:after:bg-zinc-100 hover:after:w-full hover:after:h-[0.7px] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:content:'' transition-all" >Tienda</button></Link>
                  { isAuthenticated ? <Link to='/CrearProducto' > <button class="relative text-zinc-100 hover:after:bg-zinc-100 hover:after:w-full hover:after:h-[0.7px] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:content:'' transition-all" href="/CrearProducto" >Crear Producto</button></Link> : null}
                  
                </div>
                <div class="items-center font-semibold text-xl flex gap-6 text-zinc-100">
                  { isAuthenticated ? 
                  <>
                  <Link class="relative text-zinc-100 hover:after:bg-zinc-100 hover:after:w-full hover:after:h-[0.7px] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:content:'' transition-all" to='/Perfil'>Perfil</Link>
                  <button class="relative text-zinc-100 hover:after:bg-zinc-100 hover:after:w-full hover:after:h-[0.7px] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:content:'' transition-all" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Cerrar Sesión</button> </>:
                  <button class="relative text-zinc-100 hover:after:bg-zinc-100 hover:after:w-full hover:after:h-[0.7px] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:content:'' transition-all" onClick={() => loginWithRedirect()}>Iniciar Sesión</button>
                  }
                <Link class="relative text-zinc-100 hover:after:bg-zinc-100 hover:after:w-full hover:after:h-[0.7px] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:content:'' transition-all" to='/About'>About</Link>
                </div>
              </div>
            </div>
          </header>
        </div>
    )
}