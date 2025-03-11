import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
