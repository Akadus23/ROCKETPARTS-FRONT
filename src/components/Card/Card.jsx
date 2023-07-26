import "./Card.css";


export default function({producto, categoria, mainPhoto}){
    return(
        <div className="container-card">
            <h3>{producto} </h3>
            <img src={mainPhoto} alt={producto} />
            <h5>{categoria}</h5>
            
        </div>
    )
}

