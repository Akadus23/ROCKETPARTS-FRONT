import style from './Results.module.css'

export default function Results ({ver}){
    return(
        <div>
            {ver?.map(ele=>{
                return(
                    <div className={style.container} key={ele.id}>
                        <h1>{ele.id}</h1>
                        <h3>{ele.nombreproducto}</h3>
                        <img src={ele.fotoprinc} alt="" />
                        <h4>precio:{ele.precioproducto}</h4>
                    </div>
                )
            })}
            
        </div>
    )
}