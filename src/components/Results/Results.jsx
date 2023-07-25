import style from './Results.module.css'

export default function Results ({ver}){
    return(
        <div>
            {ver?.map(ele=>{
                return(
                    <div className={style.container}>{ele.nombreproducto}</div>
                )
            })}
            
        </div>
    )
}