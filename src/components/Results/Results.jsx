

export default function Results ({ver}){
    return(
        <div>
            {ver?.map(ele=>{
                return(
                    <div>{ele.name}</div>
                )
            })}
        </div>
    )
}