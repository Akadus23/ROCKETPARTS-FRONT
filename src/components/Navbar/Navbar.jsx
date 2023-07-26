import React from "react";

export default function Navbar (){
    return (
        <div class="mb-10 h-10">
          <header class="w-full h-16 bg-zinc-100 fixed">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 ml-5 mt-3 content-center">
                <a href="/" >
                  <p class="no-underline text-violet-800 font-semibold text-2xl">RocketParts</p>
                </a>
              </div>
              <div class="flex items-center gap-8 mr-5 mt-3">
                <div  class="items-center font-semibold text-xl flex gap-6" >
                  <a class="no-underline text-gray-900"  href="/Tienda" >Tienda</a>
                  <a class="no-underline text-gray-900" href="/CrearProducto" >Crear Producto</a>
                </div>
              </div>
            </div>
          </header>
        </div>
    )
}