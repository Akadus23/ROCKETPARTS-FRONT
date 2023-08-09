import style from './Fauter.module.css'

export default function Fauter(params) {
  return(
    <div className={style.container}>
      <br />
      <div>
        <ul className={style.contList}> 
          <li>
            <a href="#" target='_blank'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span>Git</span>
            </a> 
          </li>
          <li>
            <a href="#" target='_blank'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span>in</span>
            </a> 
          </li>
          <li>
            <a href="#" target='_blank'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span>📷</span>
            </a> 
          </li>
      </ul>  
    </div>
</div>
)
}