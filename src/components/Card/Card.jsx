import "./Card.css";


export default function({Ref, tipo, capacidad, precio, imagen}){
    return(
        <div className="container-card">
            <span>Ref: {Ref} </span>
            <h3>{tipo} </h3>
            <h4>{capacidad} </h4>
            <h2>Precio: {precio} </h2>
            <img src={imagen} />
        </div>
    )
}

