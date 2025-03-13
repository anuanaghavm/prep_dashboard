import React, { Children } from 'react'
import Sidebar from './Sidebar'

function Staticlayout({children}) {
  return (
    <div>
      <Sidebar/>
      <div className="">{children}</div>
    </div>
  )
}

export default Staticlayout
