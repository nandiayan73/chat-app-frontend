import { useState } from 'react'
import './App.css'
import {Routes, Route,Link} from "react-router-dom";
import Homepage from "./homePage"
// import SimpleCard from './login';

function App() {
  const [count, setCount] = useState(0)
  
  return (
  <>
 <div className='App'>
 <Routes>
    <Route path="/" element={<Homepage key="1" ></Homepage>}></Route>
    <Route path="/about" element={<div>About</div>}></Route>
  </Routes>
  
    </div>
  </>    
  
  )
}

export default App
