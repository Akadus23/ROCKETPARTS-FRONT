
import { Route, Routes } from 'react-router-dom';
import FormCreate from './components/FormCreate/FormCreate';
import Home from './views/Home/Home';
import Landing from './views/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import  {useLocation} from 'react-router-dom'


function App() {
  const {pathname} = useLocation()
  return (
    <div>
      {pathname!=='/'?<Navbar/>:null}
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path='/FormCreate' element={<FormCreate/>}/>
      </Routes>
    </div>
  )
}

export default App
