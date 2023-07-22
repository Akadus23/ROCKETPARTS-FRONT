import Card from "../Card/Card"
import "./Cards.css"

import hardware from "../../hardware";
console.log(hardware);

export default function Cards(){
    return(
        <div className="container-cards">
            {hardware.map(device=>(
                <Card key={device.id}
                      Ref={device.id} 
                      tipo={device.tipo}
                      capacidad={device.capacidad}
                      precio={device.precio}
                      imagen={device.imagen}
                />
            ))}
            
        </div>
    )
}