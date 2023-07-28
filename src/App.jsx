
import { Route, Routes } from 'react-router-dom';
import FormCreate from './components/FormCreate/FormCreate';
import Home from './views/Home/Home';
import Landing from './views/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import  {useLocation} from 'react-router-dom'
import Profile from './views/Profile/Profile';


function App() {
  const {pathname} = useLocation()
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path="/Tienda" element={<Home/>}/>
        <Route path='/CrearProducto' element={<FormCreate/>}/>
        <Route path='/Perfil' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App
