import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login/Login'
import Signup from './components/login/signup'
import Dashboard from './components/Dashboard'
import Dash from './components/Dash'
import Home from './components/home'
import Sidebar from './components/Sidebar'
import UserRoute from './components/routesindex'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Routes>

      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/Dash' element={<Dash/>}/>
      <Route path='/Sidebar' element={<Sidebar/>}/>


    </Routes> */}
    <div className="" >
      <UserRoute/>
    </div>
    </>
  )
}

export default App