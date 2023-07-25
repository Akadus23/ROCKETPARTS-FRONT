
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';

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
