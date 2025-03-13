import React from 'react'
import { Route,Routes } from 'react-router-dom'
import routconfig from './routes'

const Approutes = () => {
    return (
        <Routes>
            {
                routconfig.map((route,index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))
            }
        </Routes>
    )
}
export default Approutes
