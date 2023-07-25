import "./Card.css";


export default function({producto, id, descripcion, color, mainPhoto}){
    return(
        <div className="container-card">
            <h3>{producto} </h3>
            <span>Id: {id} </span>
            <span>{descripcion} </span>
            <span>{descripcion} </span>
            <span>Color: {color} </span>
            <img src={mainPhoto} alt={producto} />
            
        </div>
    )
}

