import style from './FormCreate.module.css'

export default function FormCreate(props) {
    return(
        <div className={style.container}>
            <form action="">
                <div>
                  <input type="text" />  
                </div>
                <div>
                  <input type="text" />  
                </div>
                <div>
                  <input type="text" />  
                </div>
                <button>a</button>
            </form>
        </div>
    )
}