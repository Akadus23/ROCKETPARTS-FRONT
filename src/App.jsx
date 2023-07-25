
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Landing from './views/Landing/Landing';

function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path="/Home" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
