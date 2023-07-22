import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './views/Home/Home'
import Landing from './views/Landing/Landing';
import './App.css'

const router = createBrowserRouter([
  { 
    path:"/", element:<Landing />
  },
  { 
    path:"/home", element:<Home />
  }
]);


function App() {
  const [count, setCount] = useState(0)

  return (
  
      <div className="container">
        <RouterProvider router={router} />
          
      </div>
     
    
  )
}

export default App
