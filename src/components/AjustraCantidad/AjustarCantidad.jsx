import { useState } from "react"

export default function AjustarCantidad({cant,leftProducts,plusProducts,precio}) {
    const [productos,setProductos] = useState(1)
    
    
    return(
        <div>
            <button onClick={()=>leftProducts(productos,setProductos,precio)}>-</button>
            {productos}
            <button onClick={()=>plusProducts(productos,setProductos,cant,precio)}>+</button>
        </div>
    )
}