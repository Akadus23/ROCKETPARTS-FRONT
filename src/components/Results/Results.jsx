import style from './Results.module.css'

export default function Results ({ver}){
    return(
        <div>
            {ver?.map(ele=>{
                return(
                    <div className={style.container} key={ele.id}>
                        <h3>{ele.nombreproducto}</h3>
                        <img className={style.imagenes} src={ele.fotoprinc} alt="" />
                        <h3>{ele.precioproducto}$</h3>
                        {ele.disponibproducto?<h3>Disponible</h3>:<h3>No disponible</h3>}
                    </div>
                )
            })}
            
        </div>
    )
}