import React from 'react'
import Staticlayout from './Staticlayout'
import Home from './home'
import Login from '../components/login/Login'
// import Signup from '../components/'
import Dashboard from '../components/dashboard'
// import Dash from './components/dash'
// import Sidebar from './components/Sidebar'
// import UserRoute from './components/routesindex'

const routes = [

    // <Route path='/login' element={<Login/>}/>
    // <Route path='/signup' element={<Signup/>}/>
    // <Route path='/Dashboard' element={<Dashboard/>}/>
    // <Route path='/Home' element={<Home/>}/>
    // <Route path='/Dash' element={<Dash/>}/>
    // <Route path='/Sidebar' element={<Sidebar/>}/>
    // {
    {
        path:'/login',
        element:(
                <Login/>
        )
    },

    {
        path:'/dashboard',
        element:(
                <Dashboard/>
        )
    },

    {
        path:'/home',
        element:(
            <Staticlayout>
                <Home/>
            </Staticlayout> 
        )
    }
]

export default routes
